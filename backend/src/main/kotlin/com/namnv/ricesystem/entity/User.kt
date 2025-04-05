package com.namnv.ricesystem.entity

import com.namnv.ricesystem.enums.Gender
import com.namnv.ricesystem.enums.UserRole
import jakarta.persistence.*
import java.time.LocalDate
import java.time.LocalDateTime

@Entity
@Table(name = "users")
class User(
    // Tên đăng nhập
    @Column(name = "username", unique = true, nullable = false, updatable = false, length = 50)
    var username: String,
    // Họ và tên
    @Column(name = "first_name", nullable = false, length = 50)
    var firstName: String,
    @Column(name = "last_name", nullable = false, length = 50)
    var lastName: String,
    // Địa chỉ email
    @Column(name = "email", unique = true, nullable = false, length = 100)
    var email: String,
    // Số điện thoại
    @Column(name = "phone", unique = true, nullable = false, length = 15)
    var phone: String,
    // Giới tính
    @Enumerated(EnumType.STRING)
    @Column(name = "gender", nullable = false, length = 10)
    var gender: Gender,
    // Ngày sinh
    @Column(name ="date_of_birth", nullable = false)
    var dateOfBirth: LocalDate,
    // Địa chỉ
    @Column(name = "address", nullable = false, length = 255)
    var address: String,
    // Vai trò của người dùng
    @Enumerated(EnumType.STRING)
    @Column(name = "role", nullable = false, length = 20)
    var role: UserRole,
    // trạng thái kích hoạt tài khoản (phải xác thực email trước khi kích hoạt)
    @Column(name = "is_active", nullable = false)
    var isActive: Boolean,
    // trạng thái tài khoản bị khóa
    @Column(name = "is_locked", nullable = false)
    var isLocked: Boolean,
    // lý do tài khoản bị khóa
    @Column(name = "locked_reason", length = 255)
    var lockedReason: String? = null,
    // trạng thái bat xac thuc hai yếu tố
    @Column(name = "is_two_factor_enabled", nullable = false)
    var isTwoFactorEnabled: Boolean,
    //  mã xác thực hai yếu tố
    @Column(name = "two_factor_secret", length = 255)
    val twoFactorSecret: String? = null,
    // lần đổi mật khẩu gần nhất
    @Column(name = "change_password_at")
    var changePasswordAt: LocalDateTime? = null,

    @ManyToMany(fetch = FetchType.EAGER)
    @JoinTable(
        name = "user_permissions",
        joinColumns = [JoinColumn(name = "user_id", referencedColumnName = "id")],
        inverseJoinColumns = [JoinColumn(name = "permission_id", referencedColumnName = "id")],
    )
    val permissions: MutableSet<Permission> = mutableSetOf(),

    @OneToMany(mappedBy = "user", cascade = [CascadeType.ALL], fetch = FetchType.LAZY, orphanRemoval = true)
    val accounts: MutableSet<Account> = mutableSetOf(),

) : BaseEntity() {
    @PrePersist
    @PreUpdate
    fun validateUsername() {
        val invalidUsernames = listOf("system", "root", "anonymoususer")
        if (invalidUsernames.contains(username.lowercase())) {
            throw IllegalArgumentException("Username '$username' is not allowed.")
        }
    }
}