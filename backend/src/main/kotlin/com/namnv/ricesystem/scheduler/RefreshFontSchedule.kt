package com.namnv.ricesystem.scheduler

import com.namnv.ricesystem.service.FontService
import kotlinx.coroutines.runBlocking
import org.springframework.scheduling.annotation.Scheduled
import org.springframework.stereotype.Component


@Component
class RefreshFontSchedule(
    private val fontService: FontService
) {
    @Scheduled(cron = "0 0 0 7 * ?")
    fun refreshFonts() = runBlocking {
        fontService.refreshFonts()
    }

}