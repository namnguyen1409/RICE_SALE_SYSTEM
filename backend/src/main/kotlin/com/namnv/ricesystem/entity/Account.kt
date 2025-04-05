package com.namnv.ricesystem.entity

import com.namnv.ricesystem.enums.AuthProvider
import jakarta.persistence.*


@Entity
@Table(
    name = "accounts",
    uniqueConstraints = [
        UniqueConstraint(columnNames = ["user_id", "provider"]),
        UniqueConstraint(columnNames = ["user_id", "provider_id"])
    ]
)
class Account(
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false, updatable = false)
    val user: User,

    @Enumerated(EnumType.STRING)
    @Column(name = "provider", nullable = false, length = 20)
    var provider: AuthProvider,

    @Column(name = "provider_id", nullable = false, length = 100)
    var providerId: String,

    @Column(name = "password", length = 255)
    var password: String? = null,

) : BaseEntity()