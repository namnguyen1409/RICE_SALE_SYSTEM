package com.namnv.ricesystem.entity

import jakarta.persistence.*

@Entity
@Table(name = "fonts")
class Font (
    @Id
    val family: String,
    val category: String,
    @ElementCollection(fetch = FetchType.EAGER)
    @CollectionTable(name = "font_variants", joinColumns = [JoinColumn(name = "family")])
    @Column(name = "variant" , length = 100)
    val variants: List<String> = emptyList(),
    @ElementCollection(fetch = FetchType.EAGER)
    @CollectionTable(name = "font_subsets", joinColumns = [JoinColumn(name = "family")])
    @Column(name = "subset" , length = 100)
    val subsets: List<String> = emptyList()
)
