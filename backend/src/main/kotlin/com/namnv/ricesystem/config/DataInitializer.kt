package com.namnv.ricesystem.config

import com.namnv.ricesystem.entity.Account
import com.namnv.ricesystem.entity.User
import com.namnv.ricesystem.enums.AuthProvider
import com.namnv.ricesystem.enums.Gender
import com.namnv.ricesystem.enums.UserRole
import com.namnv.ricesystem.repository.AccountRepository
import com.namnv.ricesystem.repository.FontRepository
import com.namnv.ricesystem.repository.UserRepository
import com.namnv.ricesystem.service.FontService
import jakarta.annotation.PostConstruct
import kotlinx.coroutines.CoroutineScope
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.launch
import org.slf4j.Logger
import org.slf4j.LoggerFactory
import org.springframework.beans.factory.annotation.Value
import org.springframework.security.crypto.password.PasswordEncoder
import org.springframework.stereotype.Component
import java.sql.DriverManager
import java.time.LocalDate
import java.util.*

@Component
class DataInitializer(
    private val userRepository: UserRepository,
    private val accountRepository: AccountRepository,
    private val passwordEncoder: PasswordEncoder,
    private val fontRepository: FontRepository,
    private val fontService: FontService,

    ) {

    private val logger: Logger = LoggerFactory.getLogger(DataInitializer::class.java)

    @Value("\${spring.datasource.username}")
    lateinit var username: String

    @Value("\${spring.datasource.password}")
    lateinit var password: String


    @PostConstruct
     fun init() {
        initDatabase()
        CoroutineScope(Dispatchers.IO).launch {
            initFonts()
        }
        initAdmin()
    }

    private fun initDatabase() {
        val url = "jdbc:postgresql://localhost:5432/postgres"
        try {
            DriverManager.getConnection(url, username, password).use { connection ->
                val statement = connection.createStatement()
                val resultSet = statement.executeQuery("SELECT 1 FROM pg_database WHERE datname = 'rice_sale_system'")
                if (!resultSet.next()) {
                    statement.executeUpdate("CREATE DATABASE rice_sale_system")
                    logger.info("✅ Database 'rice_sale_system' created successfully")
                } else {
                    logger.info("ℹ️ Database 'rice_sale_system' already exists")
                }
            }
        } catch (ex: Exception) {
            logger.error("❌ Error creating database: ${ex.message}")
        }
    }

    private fun initFonts() {
        if(fontRepository.count()== 0L) {
            CoroutineScope(Dispatchers.IO).launch {
                fontService.refreshFonts()
            }
            logger.info("✅ Fonts initialized successfully")
        }else{
            logger.info("ℹ️ Fonts already initialized")
        }
    }

    private fun initAdmin() {
        if (!userRepository.existsByUsername("admin")) {
            val owner = User(
                username = "admin",
                firstName = "Nguyen",
                lastName = "Nam",
                email = "admin@ricesystem.namnv.com",
                phone = "0123456789",
                gender = Gender.MALE,
                dateOfBirth = LocalDate.of(2004, 9, 14),
                address = "Ha Noi",
                role = UserRole.ADMIN,
                isActive = true,
                isLocked = false,
                lockedReason = null,
                isTwoFactorEnabled = false,
                twoFactorSecret = null
            )
            userRepository.save(owner)

            val account = Account(
                user = owner,
                provider = AuthProvider.LOCAL,
                providerId = UUID.randomUUID().toString(),
                password = passwordEncoder.encode("admin"),
            )
            accountRepository.save(account)
            logger.info("create admin user with username: ${owner.username} and password: admin")
        } else {
            logger.info("Admin user already exists, skipping initialization.")
        }
    }


}