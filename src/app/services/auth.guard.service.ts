import { Injectable } from '@angular/core';
// import { Http, Response, Headers, RequestOptions } from '@angular/http';
// import { HttpErrorResponse } from '@angular/common/http';
// import { Observable } from "rxjs/Observable";
import { Auth } from '../models/auth.model';
// import 'rxjs/Rx';
import { Router, CanActivate } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable()
export class AuthGuardService implements CanActivate {
  //
	// private headers:Headers;
	// private options:RequestOptions;
	// private serverURL:string;

	constructor(private router: Router, private authService: AuthService) {
		// this.headers = new Headers({ 'Content-Type': 'application/json' });
		// this.options = new RequestOptions({ headers: this.headers });
		// this.serverURL = "http://localhost:3000/api/";
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

  // not logged in so redirect to login page
  this.router.navigate(['/login']);
  return false;
}

	// private extractData(res: Response):string {
	// 	console.log(res);
	// 	let body = res.json();
	// 	return body || {};
	// }
  //
	// private handleError(error: any) {
	// 	let errMsg = (error.message) ? error.message :
	// 	error.status ? `${JSON.parse(error._body).message}` : 'Unable connect to server';
	// 	console.error(errMsg);
	// 	return Observable.throw(errMsg);
	// }
}
