package com.namnv.ricesystem.config

import org.springframework.context.annotation.Bean
import org.springframework.context.annotation.Configuration
import org.springframework.security.config.annotation.web.builders.HttpSecurity
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity
import org.springframework.security.config.http.SessionCreationPolicy
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder
import org.springframework.security.crypto.password.PasswordEncoder
import org.springframework.security.web.SecurityFilterChain

@Configuration
@EnableWebSecurity
class SecurityConfig {

    @Bean
    fun passwordEncoder(): PasswordEncoder {
        return BCryptPasswordEncoder()
    }

    @Bean
    fun securityFilterChain(http: HttpSecurity): SecurityFilterChain {
        http.cors {
            it.disable()
        }.csrf {
            it.disable()
        }.authorizeHttpRequests { auth ->
                auth
                    .requestMatchers(
                        "/api/v1/auth/**",
                        "/api/v1/fonts/**",
                    ).permitAll()
                    .anyRequest().authenticated()
        }.formLogin {
            it.loginPage("/api/v1/auth/login")
                .loginProcessingUrl("/api/v1/auth/login")
                .defaultSuccessUrl("/api/v1/auth/login/success")
                .failureUrl("/api/v1/auth/login/failure")
        }
        //        .oauth2Login {
//            it.defaultSuccessUrl("/api/v1/auth/oauth2/login/success")
//                .failureUrl("/api/v1/auth/oauth2/login/failure")
//        }
        .logout {
            it.logoutUrl("/api/v1/auth/logout")
                .logoutSuccessUrl("/api/v1/auth/logout/success")
        }.sessionManagement {
            it.sessionCreationPolicy(SessionCreationPolicy.STATELESS)
        }
        return http.build()
    }




}