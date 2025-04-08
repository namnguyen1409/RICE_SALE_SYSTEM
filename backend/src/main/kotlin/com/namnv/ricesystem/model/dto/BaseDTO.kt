package com.namnv.ricesystem.model.dto

import java.time.LocalDateTime

abstract class BaseDTO (
    val id: Long? = null,
    val createdAt: LocalDateTime?= null,
    val createdBy: String?= null,
    val updatedAt: LocalDateTime?= null,
    val updatedBy: String?= null,
    val deletedAt: LocalDateTime?= null,
    val deletedBy: String?= null,
    val isDeleted: Boolean = false,
) {
}