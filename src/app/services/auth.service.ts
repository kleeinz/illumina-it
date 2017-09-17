import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { Observable } from "rxjs/Observable";
import { Auth } from '../models/auth.model';
import { User } from '../models/user.model';
import 'rxjs/Rx';

@Injectable()
export class AuthService {

	private headers:Headers;
	private options:RequestOptions;
	private serverURL:string;
	public token:string;
	public user: User;

	constructor(private http:Http, private router: Router) {
		this.headers = new Headers({ 'Content-Type': 'application/json' });
		this.options = new RequestOptions({ headers: this.headers });
		this.serverURL = "http://localhost:3000/api/";
	}

	public auth<Auth>(auth: Auth, wilcard:string) {
		console.log("Running auth method in service, sending user data: ", auth);
		return this.http.post(this.serverURL + wilcard + "/auth", JSON.stringify(auth), this.options)
				   .map((response: Response) => {
						 console.log('Respuesttta: ', response.json().data[0]);
						 let data = response.json().data[0];
						 this.token = data.token;
						 this.user = data.user;
						 localStorage.setItem('userLogged', JSON.stringify({ user: data.user, token: data.token }));
						 return data;
					 }).catch(this.handleError);
	}

	public logout(): void {
		console.log("Disconnecting from the application...");
		this.token = null;
		this.user = null;
		localStorage.removeItem('userLogged');
		this.router.navigate(['/login']);
	}

	private extractData(res: Response):string {
		console.log(res);
		let body = res.json();
		return body || {};
	}

	private handleError(error: any) {
		let errMsg = (error.message) ? error.message :
		error.status ? `${JSON.parse(error._body).message}` : 'Unable connect to server';
		console.error(errMsg);
		return Observable.throw(errMsg);
	}
}
