package com.namnv.ricesystem.enums

enum class UserRole {
    ADMIN,
    OWNER,
    STAFF,
    CUSTOMER
}

enum class Gender {
    MALE,
    FEMALE,
    OTHER
}

enum class PermissionType {
    CUSTOMER_C,
    CUSTOMER_R,
    CUSTOMER_U,
    CUSTOMER_D,
    CUSTOMER_DEBT_C,
    CUSTOMER_DEBT_R,
    CUSTOMER_DEBT_U,
    CUSTOMER_DEBT_D,
    PRODUCT_C,
    PRODUCT_R,
    PRODUCT_U,
    PRODUCT_D,
    PRODUCT_PACKAGE_C,
    PRODUCT_PACKAGE_R,
    PRODUCT_PACKAGE_U,
    PRODUCT_PACKAGE_D,
    ZONE_C,
    ZONE_R,
    ZONE_U,
    ZONE_D,
    INVOICE_C,
    INVOICE_R,
    INVOICE_U,
    INVOICE_D,
}

enum class AuthProvider {
    LOCAL,
    GOOGLE,
    FACEBOOK,
    GITHUB
}

enum class DeviceType {
    DESKTOP,
    MOBILE,
    TABLET
}

enum class TokenType {
    REFRESH_TOKEN,
    INVITE_TOKEN,
    RESET_PASSWORD_TOKEN,
    VERIFY_EMAIL_TOKEN,

}