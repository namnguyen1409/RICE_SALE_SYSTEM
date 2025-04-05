package com.namnv.ricesystem.service

import com.namnv.ricesystem.entity.User
import com.namnv.ricesystem.model.filter.UserFilter

interface UserService : BaseService<User, UserFilter> {
    fun findByUsername(username: String): User?
    fun findByEmail(email: String): User?
    fun findByPhone(phone: String): User?
    fun findByUsernameOrEmailOrPhone(username: String, email: String, phone: String): User?
}