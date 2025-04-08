package com.namnv.ricesystem

import org.springframework.boot.autoconfigure.SpringBootApplication
import org.springframework.boot.runApplication
import org.springframework.data.jpa.repository.config.EnableJpaAuditing
import org.springframework.scheduling.annotation.EnableScheduling

@SpringBootApplication
@EnableJpaAuditing(auditorAwareRef = "auditorAwareImpl")
@EnableScheduling
class RiceSaleSystemApplication

fun main(args: Array<String>) {
    runApplication<RiceSaleSystemApplication>(*args)
}
