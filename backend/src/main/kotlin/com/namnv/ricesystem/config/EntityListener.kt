package com.namnv.ricesystem.config

import jakarta.persistence.PreRemove
import org.springframework.data.domain.AuditorAware
import org.springframework.stereotype.Component

@Component
class EntityListener (
    private val auditorAware: AuditorAware<String>
) {

    private val logger = org.slf4j.LoggerFactory.getLogger(EntityListener::class.java)

    @PreRemove
    fun preRemove(entity: Any) {
        logger.info("Entity ${entity::class.simpleName} is being removed")
        if (entity is com.namnv.ricesystem.entity.BaseEntity) {
            val currentAuditor = auditorAware.currentAuditor.orElse("system")
            entity.markAsDeleted(currentAuditor)
            logger.info("Entity ${entity::class.simpleName} marked as deleted by $currentAuditor")
        }
    }
}