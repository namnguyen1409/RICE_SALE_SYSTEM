package com.namnv.ricesystem.repository

import com.namnv.ricesystem.entity.Device
import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.data.jpa.repository.JpaSpecificationExecutor
import org.springframework.stereotype.Repository

@Repository
interface DeviceRepository: JpaRepository<Device, Long> , JpaSpecificationExecutor<Device> {
}