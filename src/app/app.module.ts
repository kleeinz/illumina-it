import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { CommonModule }  from '@angular/common';
import { NgModule } from '@angular/core';
import { DataTableModule } from "angular2-datatable";
import { BootstrapModalModule } from 'ng2-bootstrap-modal';
import { ReactiveFormsModule } from '@angular/forms';
import { UserFormComponent } from './components/users/form/form.component';

//Services
import { UserService } from './services/user.service';

//Routes
import { APP_ROUTING } from './app.routes';

import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { UsersComponent } from './components/users/users.component';
import { NavBarComponent } from './components/navbar/navbar.component';
import { ClientsComponent } from './components/clients/clients.component';
import { ModalComponent } from './components/shared/modals/modal.component';

@NgModule({
  declarations: [
  LoginComponent,
  HomeComponent,
  NavBarComponent,
  UsersComponent,
  ClientsComponent,
  ModalComponent,
  UserFormComponent,
  AppComponent
  ],
  imports: [
  BrowserModule,
  BootstrapModalModule,
  APP_ROUTING,
  HttpModule,
  CommonModule,
  ReactiveFormsModule,
  DataTableModule
  ],
  entryComponents: [
  ModalComponent
  ],
  providers: [
  UserService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
