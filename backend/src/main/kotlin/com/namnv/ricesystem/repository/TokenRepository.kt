package com.namnv.ricesystem.repository

import com.namnv.ricesystem.entity.Token
import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.data.jpa.repository.JpaSpecificationExecutor
import org.springframework.stereotype.Repository

@Repository
interface TokenRepository : JpaRepository<Token, Long>, JpaSpecificationExecutor<Token> {
}