import { Component, OnInit } from '@angular/core';
import { SharedServiceService } from '../services/shared-service.service';
@Component({
  selector: 'app-cms',
  templateUrl: './cms.component.html',
  styleUrls: ['./cms.component.sass']
})
export class CmsComponent implements OnInit {
  /**@Properties */
  public message:string;

  constructor(private sharedService: SharedServiceService) 
  { 
    this.sharedService.changeEmitted$.subscribe( text => {
      this.message = text;
      // Setting the message to null to allow multiple messages
      setTimeout(()=> this.message = null, 1000)
    })
  }

  ngOnInit() {
  }

  public componentAdded(event){
    console.log(event);
  }

  
  public componentRemoved(event){
    console.log(event);
  }
}
