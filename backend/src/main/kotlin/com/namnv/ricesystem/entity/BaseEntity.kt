package com.namnv.ricesystem.entity

import com.namnv.ricesystem.config.EntityListener
import jakarta.persistence.*
import org.springframework.data.annotation.CreatedBy
import org.springframework.data.annotation.CreatedDate
import org.springframework.data.annotation.LastModifiedBy
import org.springframework.data.annotation.LastModifiedDate
import org.springframework.data.jpa.domain.support.AuditingEntityListener
import java.time.LocalDateTime

@MappedSuperclass
@EntityListeners(AuditingEntityListener::class, EntityListener::class)
abstract class BaseEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    var id: Long? = null

    @CreatedDate
    @Column(name = "created_at", nullable = false, updatable = false)
    var createdAt: LocalDateTime? = null

    @CreatedBy
    @Column(name = "created_by", nullable = false, updatable = false)
    var createdBy: String? = null

    @LastModifiedDate
    @Column(name = "updated_at", nullable = false)
    var updatedAt: LocalDateTime? = null

    @LastModifiedBy
    @Column(name = "updated_by", nullable = false)
    var updatedBy: String? = null

    @Column(name = "is_deleted", nullable = false)
    var isDeleted: Boolean = false

    @Column(name = "deleted_at")
    var deletedAt: LocalDateTime? = null

    @Column(name = "deleted_by")
    var deletedBy: String? = null

    fun markAsDeleted(deletedBy: String) {
        this.isDeleted = true
        this.deletedAt = LocalDateTime.now()
        this.deletedBy = deletedBy
    }

    fun restore() {
        this.isDeleted = false
        this.deletedAt = null
        this.deletedBy = null
    }

    override fun toString(): String {
        return "BaseEntity(id=$id, createdAt=$createdAt, updatedAt=$updatedAt, isDeleted=$isDeleted)"
    }
}