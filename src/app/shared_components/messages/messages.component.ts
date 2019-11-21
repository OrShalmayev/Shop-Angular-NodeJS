import { Component, OnInit, Input, ViewEncapsulation } from '@angular/core';
import {MatSnackBar} from '@angular/material/snack-bar';
@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class MessagesComponent implements OnInit {
  @Input('message') public message:string;
  constructor(private snackBar: MatSnackBar) { }

  ngOnInit() {
    if(this.message){
      this.openSnackBar(this.message)
    }
  }

  openSnackBar(message:string, action:string = 'x', style:string = "success"){
    this.snackBar.open(this.message, action, {
      duration: 5000,
      panelClass: [style]
    })
  }

}
