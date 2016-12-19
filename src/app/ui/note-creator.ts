import { Component,Output,EventEmitter } from '@angular/core';

@Component({
    // moduleId: module.id,
    selector: 'note-creator',
    template: `
    <div class="note-creator shadow-2" [ngStyle]="{'background-color': newNote.color}">
      <form class="row" (submit)="onCreateNote()">
        <input
          type="text"
          [(ngModel)]="newNote.title"
          name="newNoteTitle"
          placeholder="Title"
          class="col-xs-10 title"
          *ngIf="fullForm"
        >
        <input
          type="text"
          (focus)="toggleFullForm(true)"
          [(ngModel)]="newNote.value"
          name="newNoteValue"
          placeholder="Take a note..."
          class="col-xs-10"
        >
        <div class="actions col-xs-12 row between-xs" *ngIf="fullForm">
          <div class="col-xs-3">
            <color-picker
             [colors]="colors"
             (selected)="onColorSelected($event)"
             >
             </color-picker>
          </div>
          <button
            type="submit"
            class="btn-light"
           >
            Done
          </button>
        </div>
      </form>
    </div>
    `,
    styles: [`
    .note-creator {
      padding: 20px;
      background-color: white;
      border-radius: 3px;
    }
    .title {
      font-weight: bold;
      color: rgba(0,0,0,0.8);
    }
    .full {
      height: 100px;
    }
    `]
})
export class NoteCreator { 
    @Output() createNote = new EventEmitter();
    newNote = {
        title: '',
        value: '',
        color: 'white'
    };
    fullForm: boolean = false;
    colors: string[] = ['#B19CD9', '#FF6961', '#77DD77', '#AEC6CF','#F49AC2','white'];
    onCreateNote() {
      const {title,value,color} = this.newNote;
      if (title && value) {
        this.createNote.next({title,value,color});
      }
      this.reset();
      this.toggleFullForm(false);
    }
    reset() {
      this.newNote = {
        title: '',
        value: '',
        color: 'white'
      };
    }
    toggleFullForm(value:boolean) {
      this.fullForm = value;
    }
    onColorSelected(color: string) {
      if (color) {
        this.newNote.color = color;
      }
    }
}
