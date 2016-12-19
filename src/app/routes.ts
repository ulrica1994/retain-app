import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { Main, NotesContainer,About } from './container';

export const routes: ModuleWithProviders = RouterModule.forRoot([
  { 
      path: '', 
      component: Main,
      children: [
          {
              path:'', component: NotesContainer
          },
           {
              path:'about', component: About
          }
      ]
 },
 { path: '**', redirectTo: ''}
]);
