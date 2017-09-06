import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { DataTableModule } from "angular2-datatable";

//Routes
import { APP_ROUTING } from './app.routes';

import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { UsersComponent } from './components/users/users.component';
import { NavBarComponent } from './components/navbar/navbar.component';
import { ClientsComponent } from './components/clients/clients.component';

@NgModule({
  declarations: [
  	LoginComponent,
  	HomeComponent,
    NavBarComponent,
    UsersComponent,
    ClientsComponent,
    AppComponent
  ],
  imports: [
    BrowserModule,
    APP_ROUTING,
    DataTableModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
