package com.namnv.ricesystem.controller

import com.namnv.ricesystem.service.FontService
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController

@RestController
@RequestMapping("/api/v1/fonts")
class FontController (
    private val fontService: FontService
){
    @GetMapping("/list")
    fun getAllFonts() = fontService.getAllFonts()

}