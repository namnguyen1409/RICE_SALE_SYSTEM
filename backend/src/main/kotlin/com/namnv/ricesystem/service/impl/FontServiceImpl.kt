package com.namnv.ricesystem.service.impl

import com.fasterxml.jackson.databind.ObjectMapper
import com.fasterxml.jackson.module.kotlin.jacksonObjectMapper
import com.namnv.ricesystem.entity.Font
import com.namnv.ricesystem.repository.FontRepository
import com.namnv.ricesystem.service.FontService
import kotlinx.coroutines.reactor.awaitSingle
import org.slf4j.Logger
import org.slf4j.LoggerFactory
import org.springframework.beans.factory.annotation.Value
import org.springframework.stereotype.Service
import org.springframework.web.reactive.function.client.WebClient

@Service
class FontServiceImpl  (
    val fontRepository: FontRepository,
    private val objectMapper: ObjectMapper = jacksonObjectMapper(),
    private val webClient: WebClient,
    @Value("\${api.google-font.key}") val apiKey: String,
    ) : FontService {

    private val logger: Logger = LoggerFactory.getLogger(FontServiceImpl::class.java)

    private val apiUrl = "https://www.googleapis.com/webfonts/v1/webfonts?sort=popularity&key=$apiKey"


    override fun getAllFonts(): List<Font> {
        return fontRepository.findAll()
    }

    override fun getAllFonts(subset: String?, category: String?): List<Font> {
        val fonts = fontRepository.findAll()
        return if (subset != null && category != null) {
            fonts.filter { it.subsets.contains(subset) && it.category == category }
        } else if (subset != null) {
            fonts.filter { it.subsets.contains(subset) }
        } else if (category != null) {
            fonts.filter { it.category == category }
        } else {
            fonts
        }
    }

    override fun getAllSubsets(): List<String> {
        return fontRepository.findAll().flatMap { it.subsets }.distinct()
    }

    override fun getAllCategories(): List<String> {
        return fontRepository.findAll().map { it.category }.distinct()
    }

    override suspend fun refreshFonts() {
        try {
            val responseText = webClient.get()
                .uri(apiUrl)
                .retrieve()
                .bodyToMono(String::class.java)
                .awaitSingle()
            val fonts = objectMapper.readTree(responseText)["items"]
            val fontList = fonts.map { font ->
                Font(
                    family = font["family"].asText(),
                    category = font["category"].asText(),
                    variants = font["variants"].map { it.asText() },
                    subsets = font["subsets"].map { it.asText() }
                )
            }
            fontRepository.saveAll(fontList)
            logger.info("Successfully font refreshed: $fontList")
        } catch (e: Exception) {
            logger.error("Error refreshing fonts: ${e.message}")
        }
    }

}