import { Injectable } from '@angular/core';
import { Auth } from '../models/auth.model';
import { Router, CanActivate } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable()
export class AuthGuardService implements CanActivate {

	constructor(private router: Router, private authService: AuthService) {

	}

  public canActivate():boolean {
  if (localStorage.getItem('userLogged')) {
    console.log("LocalStorage: ", localStorage.getItem('userLogged'));
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
