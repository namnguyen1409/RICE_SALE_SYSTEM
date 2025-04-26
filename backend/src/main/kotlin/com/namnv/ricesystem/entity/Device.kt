package com.namnv.ricesystem.entity

import com.namnv.ricesystem.enums.DeviceType
import jakarta.persistence.Column
import jakarta.persistence.Entity
import jakarta.persistence.Table

@Entity
@Table(name = "devices")
class Device(
    @Column(name = "device_name", nullable = false, length = 100)
    var deviceName: String,
    @Column(name = "device_code", nullable = false, unique = true, length = 100)
    var deviceCode: String,
    @Column(name = "user_agent", nullable = false, length = 255)
    var userAgent: String,
    @Column(name = "ip_address", nullable = false, length = 45)
    var ipAddress: String,
    @Column(name = "screen_size", nullable = false, length = 20)
    var screenSize: String,
    @Column(name = "platform", nullable = false, length = 20)
    var platform: String,
    @Column(name = "browser", nullable = false, length = 20)
    var browser: String,
    @Column(name = "canvas_fingerprint", nullable = false, length = 255)
    var canvasFingerprint: String,
    @Column(name = "fingerprint", nullable = false, length = 255)
    var fingerprint: String,
    @Column(name = "device_type", nullable = false, length = 20)
    var deviceType: DeviceType
) : BaseEntity() {
    fun isSameDevice(other: Device): Boolean {
        return this.browser == other.browser
                && this.canvasFingerprint == other.canvasFingerprint
                && this.deviceName == other.deviceName
                && this.platform == other.platform
                && this.screenSize == other.screenSize
                && this.userAgent == other.userAgent
                && this.deviceType == other.deviceType
    }


}