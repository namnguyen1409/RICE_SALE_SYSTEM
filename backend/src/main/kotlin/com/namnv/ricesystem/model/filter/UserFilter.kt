package com.namnv.ricesystem.model.filter

import com.namnv.ricesystem.enums.Gender

class UserFilter (
    val username: String? = null,
    val firstName: String? = null,
    val lastName: String? = null,
    val email: String? = null,
    val phone: String? = null,
    val gender: Gender? = null,
    val birthdayFrom: String? = null,
    val birthdayTo: String? = null,
    val address: String? = null,
    val isActive: Boolean? = null,
    val isLocked: Boolean? = null,
    val lockedReason: String? = null,
    val isTwoFactorEnabled: Boolean? = null,
) : BaseFilter() {
}