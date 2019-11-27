import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { OktaAuthGuard } from '@okta/okta-angular';

import { NoteDetailComponent } from './note-detail/note-detail.component';
import { NoteListComponent } from './note-list/note-list.component';
import { NoteEditComponent } from './note-edit/note-edit.component';

export function onAuthRequired({ router }) {
  router.navigate(['/login']);
}

const routes: Routes = [
  {
    path: 'note-list',
    component: NoteListComponent,
    canActivate: [OktaAuthGuard],
    data: { onAuthRequired }
  },
  {
    path: 'note-list/:id',
    component: NoteDetailComponent,
    canActivate: [OktaAuthGuard],
    data: { onAuthRequired }
  },
  {
    path: 'note-add',
    component: NoteEditComponent,
    data: { onAuthRequired }
  },
  /*{
    path: 'note-list/:id',
    component: NoteEditComponent,
    data: { onAuthRequired }
  },*/
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
