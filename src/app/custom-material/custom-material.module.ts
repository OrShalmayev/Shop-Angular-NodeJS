import { NgModule } from '@angular/core';


import {
  MatButtonModule,
  MatIconModule,
  MatBadgeModule,
  MatFormFieldModule,
  MatInputModule,
  MatSnackBarModule,
  MatOptionModule,
  MatSelectModule,
  } from '@angular/material';

import { MatFileUploadModule } from 'angular-material-fileupload';

@NgModule({
  imports: [
    MatButtonModule,
    MatIconModule,
    MatBadgeModule,
    MatFormFieldModule,
    MatInputModule,
    MatFileUploadModule,
    MatSnackBarModule,
    MatOptionModule,
    MatSelectModule,
    
  ],
  exports: [
    MatButtonModule,
    MatIconModule,
    MatBadgeModule,
    MatFormFieldModule,
    MatInputModule,
    MatFileUploadModule,
    MatSnackBarModule,
    MatOptionModule,
    MatSelectModule,
    
  ],

})
export class CustomMaterialModule { }
