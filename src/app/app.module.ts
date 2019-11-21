import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NotFoundComponent } from './shared_components/not-found/not-found.component';

import { HttpClientModule }    from '@angular/common/http';
import {FlexLayoutModule} from '@angular/flex-layout';

// Imports
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';


// modules
import { ShopModule } from './shop/shop.module';
import { CustomMaterialModule } from './custom-material/custom-material.module';
import { SharedModuleModule } from './shared-module/shared-module.module';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { LoginComponent } from './shared_components/login/login.component';
import { RegisterComponent } from './shared_components/register/register.component';

import { FlashMessagesModule } from 'angular2-flash-messages';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
  ],
  imports: [
    // angular modules
    BrowserModule,
    BrowserAnimationsModule,
    CustomMaterialModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    // custom modules
    SharedModuleModule,
    ShopModule,
    MDBBootstrapModule.forRoot(),
    FlashMessagesModule.forRoot(),
  ],
  exports: [],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule { }
