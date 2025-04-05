package com.namnv.ricesystem.repository

import com.namnv.ricesystem.entity.UserDevice
import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.data.jpa.repository.JpaSpecificationExecutor
import org.springframework.stereotype.Repository

@Repository
interface UserDeviceRepository: JpaRepository<UserDevice, Long> , JpaSpecificationExecutor<UserDevice> {
    fun findByUserIdAndDeviceId(userId: Long, deviceId: Long): UserDevice?
}