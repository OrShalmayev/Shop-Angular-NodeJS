import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-page-header',
  templateUrl: './page-header.component.html',
  styleUrls: ['./page-header.component.scss']
})
export class PageHeaderComponent implements OnInit {
  @Input('headerIconInput') public headerIconInput = '';
  @Input('headerTitleInput') public headerTitleInput = '';
  @Input('headerTextInput') public headerTextInput = '';
  @Input('headerButtonDescription') public headerButtonDescription = '';
  constructor() { }

  ngOnInit() {
  }

}
