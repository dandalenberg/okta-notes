package com.example.notes

import com.fasterxml.jackson.annotation.JsonIgnore
import javax.persistence.Entity
import javax.persistence.GeneratedValue
import javax.persistence.Id

@Entity
class Note(
        @Id @GeneratedValue var id: Long? = null,
        var text: String? = null,
        @JsonIgnore var user: String? = null
) {
}
