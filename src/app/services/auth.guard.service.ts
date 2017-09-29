import { Injectable } from '@angular/core';
import { Auth } from '../models/auth.model';
import { Router, CanActivate } from '@angular/router';
import { AuthService } from './auth.service';

/*
  This service is a guard service of Angular, implements of CanActive
  this last one is a guard that decides if the route will be activated.
  This guard works together with app.routes.ts
*/
@Injectable()
export class AuthGuardService implements CanActivate {

  /**
  @param router The injection of the router service
  @param authService The injection of the AuthService
  */
	constructor(private router: Router, private authService: AuthService) {

	}

  /**
  * This method is a method from CanActivate interface. 
  * It's executed when the app.routes.ts needs activate any route.
  * The method checks if the local storage variable called userLogged exists in the application
  * and check if the user authService property exists 
  * and assign the token from the local Storage to the user authService variable
  * to end the method returns a true and get access to the application
  * @return boolean
  */
  public canActivate():boolean {
  if (localStorage.getItem('userLogged')) {
    const userLogged = JSON.parse(localStorage.getItem('userLogged'));
    if (!this.authService.user){
      this.authService.token = userLogged.token;
      this.authService.user = userLogged.user;
    }
    return true;
  }
  this.router.navigate(['/login']);
  return false;
}

}
