package com.example.notes

import org.springframework.data.rest.core.annotation.HandleBeforeCreate
import org.springframework.data.rest.core.annotation.RepositoryRestResource
import org.springframework.security.core.context.SecurityContextHolder
import org.springframework.stereotype.Component

@Component
@RepositoryRestResource
class AddUserToNote {

    @HandleBeforeCreate
    fun handleCreate(note: Note) {
        val username: String = SecurityContextHolder.getContext().authentication.name
        println("Creating note: $note with user: $username")
        note.user = username
    }
}
