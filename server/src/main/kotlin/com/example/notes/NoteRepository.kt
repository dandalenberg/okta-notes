package com.example.notes

import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.data.rest.core.annotation.RepositoryRestResource

@RepositoryRestResource
interface NoteRepository : JpaRepository<Note, Long> {
    fun findAllByUser(name: String): List<Note>
}
