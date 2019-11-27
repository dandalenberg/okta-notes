import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class NoteService {

  public API = 'http://localhost:8083';
  public NOTE_API = this.API + '/note-list';

  constructor(private http: HttpClient) { }

  getAll(): Observable<any> {
    return this.http.get(this.API);
  }

  getNote(id: string) {
    return this.http.get(this.NOTE_API + '/' + id);
  }

  save(note: any): Observable<any> {
    let result: Observable<any>;
    if (note.href) {
      result = this.http.put(note.href, note);
    } else {
      result = this.http.post(this.NOTE_API, note);
    }
    return result;
  }

  remove(href: string) {
    return this.http.delete(href);
  }
}
