import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MessagesComponent } from '../shared_components/messages/messages.component';
import { CancelButtonComponent } from '../shared_components/cancel-button/cancel-button.component';
import { CustomMaterialModule } from '../custom-material/custom-material.module';
import { HeaderComponent } from '../shared_components/header/header.component';
import { FooterComponent } from '../shared_components/footer/footer.component';
import { MainComponent } from '../shared_components/main/main.component';
import { NotFoundComponent } from '../shared_components/not-found/not-found.component';
import { SharedRoutingModule } from '../shared_components/shared-routing.module';
import { PageHeaderComponent } from '../shared_components/page-header/page-header.component';
import { IntroComponent } from '../shared_components/header/components/intro/intro.component';

@NgModule({
  declarations: [
    MessagesComponent,
    CancelButtonComponent,
    IntroComponent,
    HeaderComponent,
    FooterComponent,
    MainComponent,
    PageHeaderComponent,
    NotFoundComponent,
  ],
  imports: [
    CommonModule,
    CustomMaterialModule,
    SharedRoutingModule,

  ],
  exports: [
    MessagesComponent,
    CancelButtonComponent,
    IntroComponent,
    HeaderComponent,
    FooterComponent,
    MainComponent,
    NotFoundComponent,
    PageHeaderComponent
  ]
})
export class SharedModuleModule { }
