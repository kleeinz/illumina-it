import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { HttpErrorResponse } from '@angular/common/http';
import { Observable } from "rxjs/Observable";
import 'rxjs/Rx';

@Injectable()
export class UserService<Model> {

	private headers:Headers;
	private options:RequestOptions;
	private serverURL:string;
	
	constructor(private http:Http) {
		this.headers = new Headers({ 'Content-Type': 'application/json' });
		this.options = new RequestOptions({ headers: this.headers });
		this.serverURL = "http://localhost:3000/";
	}

	public save<Model>(model: Model, wildcard:string) {
		console.log("Running save method in service, ", JSON.stringify(model));
		return this.http.post( this.serverURL + wildcard + "/save",
			JSON.stringify(model), this.options )
		.map(this.extractData).catch(this.handleError);
	}

	public find<Model>(wildcard: string): Observable<Array<Model>> {
		console.log("Running find method in service");
		return this.http.get(this.serverURL + wildcard + "/find")
                    .map(this.extractData).catch(this.handleError);
	}

	private extractData(res: Response):string {
		console.log("XXXXXXX, ", res);
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