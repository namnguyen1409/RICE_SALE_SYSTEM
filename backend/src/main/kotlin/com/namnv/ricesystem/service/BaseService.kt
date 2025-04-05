package com.namnv.ricesystem.service

import com.namnv.ricesystem.model.filter.BaseFilter
import org.springframework.data.domain.Page
import org.springframework.data.domain.Pageable

interface BaseService<T, F : BaseFilter> {
    fun findAll(filter: F, pageable: Pageable): Page<T>
}