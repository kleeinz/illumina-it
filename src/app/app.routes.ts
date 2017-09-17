import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { UsersComponent } from './components/users/users.component';
import { ClientsComponent } from './components/clients/clients.component';
import { AuthGuardService } from './services/auth.guard.service';

const APP_ROUTES: Routes = [
	{ path: 'home', component: HomeComponent,
		children:[
			{ path: 'users', component: UsersComponent, canActivate: [AuthGuardService] },
			{ path: 'clients', component: ClientsComponent, canActivate: [AuthGuardService] }
		],
		canActivate: [AuthGuardService]
	},
	{ path: 'login', component: LoginComponent },
	{ path: '**', pathMatch: 'full', redirectTo: 'login', canActivate: [AuthGuardService] }
];

export const APP_ROUTING = RouterModule.forRoot(APP_ROUTES);
