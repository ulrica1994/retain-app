import { Component } from '@angular/core';
import { AuthService } from '../services/auth';
@Component({
    selector: 'app-bar',
    styles: [`
    .app-bar {
      height: 65px;
      padding: 5px 30px;
      background-color: #00BCD4;
    }
    .logo {
      color: white;
      font-size: 30px;
      font-weight: 300;
      cursor: pointer;
    }
    .link {
      color: white;
      font-size: 24px;
      font-weight: 400;
      cursor: pointer; 
    }
    `],
    template: `
    <header class="app-bar row middle-xs">
        <span [routerLink]="['']" class="logo col-xs-10">
        Retain
        </span>
        <nav class="col-xs-2">
        <div class="row middle-xs between-xs">
            <span class="link" [routerLink]="['','about']">About</span>
            <span class="link" (click)="signout()">signout</span>
        </div>
        </nav>
    </header>
    `
})
export class AppBar {
  constructor(private auth: AuthService) {}
  signout() {
    this.auth.signout();
  }
}