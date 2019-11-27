package com.example.notes

import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.RestController
import java.security.Principal

@RestController
class HomeController(val repository: NoteRepository) {

    @GetMapping("/")
    fun home(principal: Principal): List<Note> {
        println("Fetching notes for user: ${principal.name}")
        val notes = repository.findAllByUser(principal.name)
        if(notes.isEmpty()) {
            return listOf()
        } else {
            return notes
        }
    }
}
