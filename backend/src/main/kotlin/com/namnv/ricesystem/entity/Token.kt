package com.namnv.ricesystem.entity

import com.namnv.ricesystem.enums.TokenType
import jakarta.persistence.*
import java.time.Duration
import java.time.LocalDateTime

@Entity
@Table(name = "tokens")
class Token (
    // for not user (eg: invite)
    @Column(name = "email", length = 100)
    var email: String? = null,

    // for user//[[;p[ok0k98u7uikl,./
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", updatable = false)
    val user: User? = null,

    @Column(name = "token", nullable = false, length = 255)
    var token: String,

    @Column(name = "type", nullable = false, length = 20)
    var type: TokenType,

) : BaseEntity() {

    // kiểm tra token có hết hạn hay không
    fun isExpired(): Boolean {
        val ttl = when (type) {
            TokenType.REFRESH_TOKEN -> Duration.ofDays(30)
            TokenType.INVITE_TOKEN -> Duration.ofDays(1)
            TokenType.RESET_PASSWORD_TOKEN -> Duration.ofHours(1)
            TokenType.VERIFY_EMAIL_TOKEN -> Duration.ofDays(1)
        }
        return updatedAt?.plus(ttl)?.isBefore(LocalDateTime.now()) ?: true
    }
}