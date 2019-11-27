import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';

import { NoteService } from '../note.service';

@Component({
  selector: 'app-note-edit',
  templateUrl: './note-edit.component.html',
  styleUrls: ['./note-edit.component.css']
})
export class NoteEditComponent implements OnInit, OnDestroy {

  note: any = {};

  sub: Subscription;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private noteService: NoteService
  ) { }

  ngOnInit() {
    this.sub = this.route.params.subscribe(
      params => {
        const id = params.id;
        if (id) {
          this.noteService.getNote(id).subscribe(
            (note: any) => {
              if (note) {
                this.note = note;
                this.note.href = note._links.self.href;
              } else {
                console.log(`Note with id '${id}' not found, returning to list`);
                this.gotoList();
              }
            });
        }
      });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  gotoList() {
    this.router.navigate(['/note-list']);
  }

  save(form: NgForm) {
    this.noteService.save(form).subscribe(
      result => {
        this.gotoList();
      },
      error => console.error(error)
    );
  }

  remove(href) {
    this.noteService.remove(href).subscribe(
      result => {
        this.gotoList();
      },
      error => console.error(error)
    );
  }
}
