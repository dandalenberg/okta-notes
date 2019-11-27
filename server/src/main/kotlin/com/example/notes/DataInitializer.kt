package com.example.notes

import org.springframework.boot.ApplicationArguments
import org.springframework.boot.ApplicationRunner
import org.springframework.stereotype.Component
import java.lang.Exception

@Component
class DataInitializer(val repository: NoteRepository) : ApplicationRunner {

    @Throws(Exception::class)
    override fun run(args: ApplicationArguments?) {
        listOf("Note 1", "Note 2", "Note 3").forEach {
            repository.save(Note(text = it, user = "test-user@synertex.com"))
        }
        repository.findAll().forEach { println(it) }
    }
}
