package com.namnv.ricesystem.ultil

import org.springframework.stereotype.Component
import java.time.Duration


@Component
class DurationUtil {
    fun parseDuration(durationStr: String): Duration {
        val pattern = Regex("""(\d+)([smhd])""", RegexOption.IGNORE_CASE)
        val match = pattern.matchEntire(durationStr)
        ?: throw IllegalArgumentException("Invalid duration format: $durationStr")
        val (amountStr, unit) = match.destructured
        val amount = amountStr.toLong()
        return when (unit.lowercase()) {
            "s" -> Duration.ofSeconds(amount)
            "m" -> Duration.ofMinutes(amount)
            "h" -> Duration.ofHours(amount)
            "d" -> Duration.ofDays(amount)
            "w" -> Duration.ofDays(amount * 7)
            "M" -> Duration.ofDays(amount * 30)
            "y" -> Duration.ofDays(amount * 365)
            else -> throw IllegalArgumentException("Invalid duration unit: $unit")
        }
    }
}