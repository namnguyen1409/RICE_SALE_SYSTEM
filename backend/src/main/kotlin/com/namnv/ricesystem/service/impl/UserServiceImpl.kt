package com.namnv.ricesystem.service.impl

import com.namnv.ricesystem.entity.User
import com.namnv.ricesystem.model.filter.UserFilter
import com.namnv.ricesystem.service.UserService
import org.springframework.data.domain.Page
import org.springframework.data.domain.Pageable
import org.springframework.stereotype.Service

@Service
class UserServiceImpl : UserService {
    override fun findByUsername(username: String): User? {
        TODO("Not yet implemented")
    }

    override fun findByEmail(email: String): User? {
        TODO("Not yet implemented")
    }

    override fun findByPhone(phone: String): User? {
        TODO("Not yet implemented")
    }

    override fun findByUsernameOrEmailOrPhone(username: String, email: String, phone: String): User? {
        TODO("Not yet implemented")
    }

    override fun findAll(filter: UserFilter, pageable: Pageable): Page<User> {
        TODO("Not yet implemented")
    }
}