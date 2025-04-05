package com.namnv.ricesystem.entity

import jakarta.persistence.*
import java.time.LocalDateTime

@Entity
@Table(name = "user_devices",
    uniqueConstraints = [
        UniqueConstraint(columnNames = ["user_id", "device_id"]),
        UniqueConstraint(columnNames = ["user_id", "token_id"])
    ]
)
class UserDevice(
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    val user: User,

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "device_id", nullable = false, updatable = false)
    val device: Device,

    @Column(name = "last_login", nullable = false)
    var lastLogin: LocalDateTime = LocalDateTime.now(),

    @Column(name = "is_revoked", nullable = false)
    var isRevoked: Boolean = false,

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "token_id", nullable = false, unique = true)
    val token: Token? = null,

) : BaseEntity ()