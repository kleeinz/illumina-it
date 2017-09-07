import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { UsersComponent } from './components/users/users.component';
import { ClientsComponent } from './components/clients/clients.component';

const APP_ROUTES: Routes = [
	{ path: 'home', component: HomeComponent , 
		children:[
			{path: 'users', component: UsersComponent},
	{path: 'clients', component: ClientsComponent}
		]
	},
	{ path: 'login', component: LoginComponent },
	{ path: '**', pathMatch: 'full', redirectTo: 'login' }
];

export const APP_ROUTING = RouterModule.forRoot(APP_ROUTES);