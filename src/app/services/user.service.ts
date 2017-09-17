import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { HttpErrorResponse } from '@angular/common/http';
import { Observable } from "rxjs/Observable";
import { Auth } from '../models/auth.model';
import 'rxjs/Rx';

@Injectable()
export class UserService<Model> {

	private headers:Headers;
	private options:RequestOptions;
	private serverURL:string;

	constructor(private http:Http) {
		this.headers = new Headers({ 'Content-Type': 'application/json' });
		this.options = new RequestOptions({ headers: this.headers });
		this.serverURL = "http://localhost:3000/api/";
	}

	public auth<Auth>(auth: Auth, wilcard:string) {
		console.log("Running auth method in service, sending user data: ", auth);
		return this.http.post(this.serverURL + wilcard + "/auth", JSON.stringify(auth), this.options)
				   .map(this.extractData).catch(this.handleError);
	}

	public save<Model>(model: Model, wildcard:string) {
		console.log("Running save method in service, ", JSON.stringify(model));
		return this.http.post( this.serverURL + wildcard + "/save",
			JSON.stringify(model), this.options )
		.map(this.extractData).catch(this.handleError);
	}

	public find<Model>(wildcard: string): Observable<any> {
		console.log("Running find method in service");
		return this.http.get(this.serverURL + wildcard + "/find")
                    .map(this.extractData).catch(this.handleError);
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
