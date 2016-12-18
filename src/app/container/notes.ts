import { Component } from '@angular/core';

@Component({
    // moduleId: module.id,
    selector: 'notes-container',
    template: `
    <div class="row center-xs notes">
      <div class="col-xs-6 creator">
        note creator here
      </div>
      <div class="notes col-xs-8">
        <div class="row between-xs">
          <note-card
            class="col-xs-4"
            [note]="note"
            *ngFor="let note of notes; let i = index"
            (checked)="onNoteChecked(i)"
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
    notes = [
      {title: 'This is first note!', value: 'eat some food', color: 'lightblue'},
      {title: 'This is second note!', value: 'read book', color: 'red'},
      {title: 'This is third note!', value: 'wash clothes', color: 'yellow'}
    ];
    onNoteChecked(i: number) {
      this.notes.splice(i,1);
    }
 }
