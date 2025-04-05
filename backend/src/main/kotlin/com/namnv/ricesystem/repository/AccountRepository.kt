package com.namnv.ricesystem.repository

import com.namnv.ricesystem.entity.Account
import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.data.jpa.repository.JpaSpecificationExecutor
import org.springframework.stereotype.Repository

@Repository
interface AccountRepository : JpaRepository<Account, Long>, JpaSpecificationExecutor<Account> {
}