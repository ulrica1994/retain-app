import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
    // moduleId: module.id,
    selector: 'color-picker',
    template: `
        <div class="color-selector">
          <i (click)="showPicker(true)" class="material-icons icon">color_lens</i>
          <div class="selector row center-xs" *ngIf="isSelectorVisible">
            <div 
              class="color" 
              *ngFor="let color of colors" 
              (click)="selectColor(color)"
              [ngStyle] = "{'background-color':color}"
              >
              </div>
          </div>
        </div>
        `,
    styles: [`
    .color-selector {
      position: relative;
    }
    .selector {
      min-width: 120px;
      border: 1px solid lightgrey;
      padding: 10px;
      background-color: #efefef;
      position: absolute;
      top: -50px;
      left: 0;
    }
    .color {
      height: 30px;
      width: 30px;
      border-radius: 100%;
      cursor: pointer;
      margin-right: 10px;
      margin-bottom: 10px;
    }
    .color:hover {
      border: 2px solid darkgrey;
    }
    .icon {
      font-size: 1.4rem;
      color: grey;
      cursor: pointer;
    }
    `]
})
export class ColorPicker {
  @Input() colors: string[] = [];
  @Output() selected = new EventEmitter();
  isSelectorVisible: boolean = false;
  selectColor(color: string) {
    this.selected.next(color);
    this.showPicker(false);
  }
  showPicker(value: boolean) {
    this.isSelectorVisible = value;
  }

 }
