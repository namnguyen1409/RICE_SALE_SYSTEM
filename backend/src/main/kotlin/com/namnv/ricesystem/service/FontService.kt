package com.namnv.ricesystem.service

import com.namnv.ricesystem.entity.Font

interface FontService {
    fun getAllFonts() : List<Font>
    fun getAllFonts(subset: String?, category: String?): List<Font>
    fun getAllSubsets(): List<String>
    fun getAllCategories(): List<String>
    suspend fun refreshFonts()
}