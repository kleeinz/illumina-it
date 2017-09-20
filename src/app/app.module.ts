// Components Dependencies
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { CommonModule }  from '@angular/common';
import { NgModule } from '@angular/core';
import { DataTableModule } from "angular2-datatable";
import { BootstrapModalModule } from 'ng2-bootstrap-modal';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MdDialogModule } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FileSelectDirective } from 'ng2-file-upload';


// Services
import { GenericService } from './services/generic.service';
import { AuthService } from './services/auth.service';
import { AuthGuardService } from './services/auth.guard.service';
import { SharedService } from './services/shared.service';
import { ImageService } from './services/image.service';

// Routes
import { APP_ROUTING } from './app.routes';

// Custom Components
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { UsersComponent } from './components/users/users.component';
import { NavBarComponent } from './components/navbar/navbar.component';
import { ClientsComponent } from './components/clients/clients.component';
import { DialogForm } from './components/shared/modals/dialogForm';
import { ConfirmDialog } from './components/shared/modals/confirmDialog';
import { DialogClientForm } from './components/shared/modals/dialogClientForm';
import { ConfirmClientDialog } from './components/shared/modals/confirmClient';
import { UserFormComponent } from './components/users/form/form.component';
import { FilterDataTablePipe } from './components/shared/pipes/filter-datatable.pipe';
import { HidePasswordPipe } from './components/shared/pipes/hide-password.pipe';
import { ClientFormComponent } from './components/clients/form/clientForm.component';

@NgModule({
  declarations: [
  LoginComponent,
  HomeComponent,
  NavBarComponent,
  UsersComponent,
  ClientsComponent,
  UserFormComponent,
  ClientFormComponent,
  DialogForm,
  ConfirmDialog,
  DialogClientForm,
  ConfirmClientDialog,
  FilterDataTablePipe,
  HidePasswordPipe,
  FileSelectDirective,
  AppComponent
  ],
  imports: [
  BrowserModule,
  BootstrapModalModule,
  APP_ROUTING,
  HttpModule,
  CommonModule,
  BrowserAnimationsModule,
  MdDialogModule,
  ReactiveFormsModule,
  DataTableModule,
  FormsModule
  ],
  entryComponents: [
  DialogForm,
  ConfirmDialog,
  DialogClientForm,
  ConfirmClientDialog
  ],
  providers: [
  GenericService,
  AuthService,
  AuthGuardService,
  ImageService,
  SharedService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
