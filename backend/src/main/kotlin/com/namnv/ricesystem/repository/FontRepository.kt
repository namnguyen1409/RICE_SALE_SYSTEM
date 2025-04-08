package com.namnv.ricesystem.repository

import com.namnv.ricesystem.entity.Font
import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.data.jpa.repository.JpaSpecificationExecutor
import org.springframework.stereotype.Repository

@Repository
interface FontRepository : JpaRepository<Font, String>, JpaSpecificationExecutor<Font> {
}