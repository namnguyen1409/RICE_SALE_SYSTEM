package com.namnv.ricesystem.ultil

import org.springframework.beans.factory.annotation.Value
import org.springframework.stereotype.Component
import java.util.*
import javax.crypto.Cipher
import javax.crypto.SecretKey
import javax.crypto.spec.SecretKeySpec

@Component
class EncryptionUtil (
    @Value("\${app.security.algorithm}")
    private val algorithm: String,
    @Value("\${app.security.secret}")
    private val secret: String,
){

    fun encrypt(data: String) : String {
        val cipher : Cipher = Cipher.getInstance(algorithm)
        cipher.init(Cipher.ENCRYPT_MODE, getSecretKey())
        val encryptedData: ByteArray = cipher.doFinal(data.toByteArray())
        return Base64.getEncoder().encodeToString(encryptedData)
    }

    fun decrypt(data: String) : String {
        val cipher : Cipher = Cipher.getInstance(algorithm)
        cipher.init(Cipher.DECRYPT_MODE, getSecretKey())
        val decodedData: ByteArray = Base64.getDecoder().decode(data)
        val decryptedData: ByteArray = cipher.doFinal(decodedData)
        return String(decryptedData)
    }

    private fun getSecretKey(): SecretKey {
        val decodedKey = Base64.getDecoder().decode(secret)
        return SecretKeySpec(decodedKey, 0, decodedKey.size, algorithm)
    }


}