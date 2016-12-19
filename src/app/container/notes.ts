import { Component } from '@angular/core';
import { NoteService } from '../services';

@Component({
    // moduleId: module.id,
    selector: 'notes-container',
    template: `
    <div class="row center-xs notes">
      <div class="col-xs-6 creator">
        <note-creator (createNote)="onCreateNote($event)"></note-creator>
      </div>
      <div class="notes col-xs-8">
        <div class="row between-xs">
          <note-card
            class="col-xs-4"
            [note]="note"
            *ngFor="let note of notes;"
            (checked)="onNoteChecked($event)"
          >
          </note-card>
        </div>
      </div>
    </div>
    `,
    styles: [`
    .notes {
      padding-top: 50px;
    }
    .creator {
      margin-bottom: 40px; 
    }
    `]
})
export class NotesContainer {
    notes = [];
    constructor(private noteService: NoteService) {
      this.noteService.getNotes()
      .subscribe(resp => this.notes = resp.data);
    }
    onNoteChecked(note) {
      this.noteService.completeNote(note)
      .subscribe(note => {
        const i = this.notes.findIndex(localNote => localNote.id === note.id);
        this.notes.splice(i,1);
      })
    }
    onCreateNote(note) {
      this.noteService.createNote(note)
      .subscribe(note => this.notes.push(note))
    }
 }
