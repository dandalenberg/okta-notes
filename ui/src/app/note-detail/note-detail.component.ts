import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NoteService } from '../note.service';

@Component({
  selector: 'app-note-detail',
  templateUrl: './note-detail.component.html',
  styleUrls: ['./note-detail.component.css']
})
export class NoteDetailComponent implements OnInit {

  note: any = {};

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private noteService: NoteService,
  ) { }

  ngOnInit() {
    this.route.params.subscribe(
      params => {
        const id = params['id'];
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

  gotoList() {
    this.router.navigate(['/note-list']);
  }

}
