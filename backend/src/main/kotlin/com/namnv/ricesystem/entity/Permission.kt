package com.namnv.ricesystem.entity

import com.namnv.ricesystem.enums.PermissionType
import jakarta.persistence.*

@Entity
@Table(name = "permissions")
class Permission (
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false, updatable = false)
    var id: Long? = null,

    @Enumerated(EnumType.STRING)
    @Column(name = "name", nullable = false, length = 50)
    var name: PermissionType? = null,
){
}