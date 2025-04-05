package com.namnv.ricesystem.security.token

import com.namnv.ricesystem.entity.Account
import com.namnv.ricesystem.entity.Device
import com.namnv.ricesystem.entity.User
import com.namnv.ricesystem.repository.UserDeviceRepository
import com.namnv.ricesystem.ultil.DurationUtil
import io.jsonwebtoken.Claims
import io.jsonwebtoken.Jwts
import io.jsonwebtoken.io.Decoders
import io.jsonwebtoken.security.Keys
import org.slf4j.Logger
import org.slf4j.LoggerFactory
import org.springframework.beans.factory.annotation.Value
import org.springframework.stereotype.Component
import java.time.Duration
import java.time.Instant
import java.util.*
import javax.crypto.SecretKey

@Component
class JwtTokenProvider (
    @Value("\${app.security.jwt.access-token.secret}")
    private val secret: String,
    @Value("\${app.security.jwt.access-token.expiration}")
    private val expirationStr: String,
    durationUtil: DurationUtil,
    private val userDeviceRepository: UserDeviceRepository,
){
    private val logger: Logger = LoggerFactory.getLogger(JwtTokenProvider::class.java)
    private val exception: Duration = durationUtil.parseDuration(expirationStr)

    fun generateToken(user: User, account: Account, device: Device) : String{
        val claims : MutableMap<String, Any> = mutableMapOf(
            "userId" to (user.id?: -1),
            "accountId" to (account.id?: -1),
            "deviceId" to (device.id?: -1),
            "username" to user.username,
            "role" to user.role.name,
            "permissions" to user.permissions.map { it.name },
            "provider" to account.provider.name
        )
        val key: SecretKey = generateKey()

        val now = Instant.now()
        val expiration = now.plus(exception)
        return Jwts.builder()
            .subject(user.id.toString())
            .issuedAt(Date.from(now))
            .expiration(Date.from(expiration))
            .claims(claims)
            .signWith(key)
            .compact()
    }

    fun getUserId(token: String) : Long {
        val claims = getClaim(token)
        return claims.subject.toLong()
    }
    fun getUsername(token: String) : String {
        val claims = getClaim(token)
        return claims["username"] as String
    }
    fun getAccountId(token: String) : Long {
        val claims = getClaim(token)
        return claims["accountId"] as Long
    }
    fun getDeviceId(token: String) : Long {
        val claims = getClaim(token)
        return claims["deviceId"] as Long
    }
    fun getRole(token: String) : String {
        val claims = getClaim(token)
        return claims["role"] as String
    }

    fun getPermissions(token: String) : List<String> {
        val claims = getClaim(token)
        return claims["permissions"] as? List<String> ?: emptyList()
    }

    fun getProvider(token: String) : String {
        val claims = getClaim(token)
        return claims["provider"] as String
    }

    fun isTokenExpired(token: String) : Boolean {
        val claims = getClaim(token)
        return claims.expiration.before(Date())
    }

    fun isTokenInvalid(token: String) : Boolean {
        val claims = getClaim(token)
        val userId = claims["userId"] as? String
        val accountId = claims["accountId"] as? String
        val deviceId = claims["deviceId"] as? String

        if (userId == null || accountId == null || deviceId == null) {
            logger.error("❌ Missing required claims in token")
            return true
        }

        if (claims.expiration.before(Date())) {
            logger.error("❌ Token is expired")
            return true
        }
        val userDevice = userDeviceRepository.findByUserIdAndDeviceId(userId.toLong(), deviceId.toLong())
        if (userDevice == null) {
            logger.error("❌ Account device not found")
            return true
        }
        if (userDevice.isRevoked) {
            logger.error("❌ Account device is revoked")
            return true
        }
        return false
    }

    private fun getClaim(token: String) : Claims {
        val key: SecretKey = generateKey()
        return Jwts.parser()
            .verifyWith(key)
            .build()
            .parseSignedClaims(token)
            .payload
    }

    private fun generateKey() : SecretKey {
        val keyBytes = Decoders.BASE64.decode(secret)
        return Keys.hmacShaKeyFor(keyBytes)
    }

}