package com.namnv.ricesystem.security

import com.namnv.ricesystem.entity.User
import com.namnv.ricesystem.enums.AuthProvider
import org.springframework.security.core.GrantedAuthority
import org.springframework.security.core.authority.SimpleGrantedAuthority
import org.springframework.security.core.userdetails.UserDetails

class CustomUserDetails(
    private val user: User
) : UserDetails {
    override fun getAuthorities(): MutableCollection<out GrantedAuthority> {
        val authorities = mutableListOf<GrantedAuthority>()
        authorities.add(SimpleGrantedAuthority("ROLE_" + user.role.name))
        user.permissions.forEach {
            authorities.add(SimpleGrantedAuthority(it.name?.name ?: ""))
        }
        return authorities
    }

    override fun getPassword(): String {
        return user.accounts.firstOrNull {it.provider == AuthProvider.LOCAL}?.password ?: ""
    }

    override fun getUsername(): String {
        return user.username
    }

    override fun isEnabled(): Boolean {
        return user.isActive
    }

    override fun isAccountNonLocked(): Boolean {
        return !user.isLocked
    }

    override fun isAccountNonExpired(): Boolean {
        return !user.isDeleted
    }
}