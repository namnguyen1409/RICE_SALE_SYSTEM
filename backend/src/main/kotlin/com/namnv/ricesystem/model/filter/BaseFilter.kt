package com.namnv.ricesystem.model.filter

import jakarta.validation.constraints.Min
import org.springframework.format.annotation.DateTimeFormat
import java.time.LocalDateTime

abstract class BaseFilter (
    @Min(1)
    val page: Int = 1,
    @Min(1)
    val size: Int = 10,
    val orderBy: String? = "id",
    val direction: String? = "desc",
    @DateTimeFormat(pattern = "yyyy-MM-dd'T'HH:mm:ss")
    val createdAtFrom: LocalDateTime? = null,
    @DateTimeFormat(pattern = "yyyy-MM-dd'T'HH:mm:ss")
    val createdAtTo: LocalDateTime? = null,
    @DateTimeFormat(pattern = "yyyy-MM-dd'T'HH:mm:ss")
    val updatedAtFrom: LocalDateTime? = null,
    @DateTimeFormat(pattern = "yyyy-MM-dd'T'HH:mm:ss")
    val updatedAtTo: LocalDateTime? = null,
    @DateTimeFormat(pattern = "yyyy-MM-dd'T'HH:mm:ss")
    val deletedAtFrom: LocalDateTime? = null,
    @DateTimeFormat(pattern = "yyyy-MM-dd'T'HH:mm:ss")
    val deletedAtTo: LocalDateTime? = null,
    val isDeleted: Boolean? = null,
    val createdBy: String? = null,
    val updatedBy: String? = null,
    val deletedBy: String? = null,
    val id: Long? = null
)