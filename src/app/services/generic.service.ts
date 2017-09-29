import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from "rxjs/Observable";
import 'rxjs/Rx';

/*
	Generic Service is a class with methods for consuming web service of the server
	to build a CRUD.
*/
@Injectable()
export class GenericService<Model> {

	private headers:Headers;
	private options:RequestOptions;
	private serverURL:string;

	/**
	The constructor initialize the variables declared above.
	@param http The injection of the Http service
	*/
	constructor(private http:Http) {
		this.headers = new Headers({ 'Content-Type': 'application/json' });
		this.options = new RequestOptions({ headers: this.headers });
		this.serverURL = "http://localhost:3000/api/";
	}

	/**
    This method consumes the web service that saves a new Model in the server
    @param model The Model to send to the server
    @param wildcard controller name for the communication with the server
  	*/
	public save(model: Model, wildcard:string) {
		console.log("Running save method in service");
		return this.http.post(this.serverURL + wildcard + "/save",
			JSON.stringify(model), this.options )
		.map(this.extractData).catch(this.handleError);
	}

	/** 
	* This method consumes the web service that update a movel in the database.
	* @param model The model sent to the server
	* @param wildcard controller name for the communication with the server
	*/
	public update(model: Model, wildcard: string) {
		console.log("Running update method in service");
		return this.http.put(this.serverURL + wildcard + "/update", JSON.stringify(model), this.options)
						 .map(this.extractData).catch(this.handleError);
	}

	/**
    This method consumes the web service that gets a model list from the database
    @param wildcard controller name for the communication with the server
    @return Observable<any> the response from the server with a model list from the database.
  	*/
	public find(wildcard: string): Observable<any> {
		console.log("Running find method in service");
		return this.http.get(this.serverURL + wildcard + "/find")
                    .map(this.extractData).catch(this.handleError);
	}

	/**
    This method calls the web service who remove a model object in the database
    @param model the correspond model for the object to search and remove on the server
    @param wildcard controller name for the communication with the server
  	*/
	public delete(model: Model, wilcard:string) {
		console.log("Running delete method in service");
		return this.http.post(this.serverURL + wilcard + "/delete", JSON.stringify(model), this.options)
				   .map(this.extractData).catch(this.handleError);
	}

	/**
    This method extract the information of the response and get the correct json string
    @param res The response parameter from the server
    @return Json data with information about response
  	*/
	private extractData(res: Response):string {
		let body = res.json();
		return body || {};
	}

	/**
    This method is an error handler that we use to detect a fail connection of the server
    @param error The error sent from server
  	*/
	private handleError(error: any) {
		let errMsg = (error.message) ? error.message :
		error.status ? `${JSON.parse(error._body).message}` : 'Unable connect to server';
		console.error(errMsg);
		return Observable.throw(errMsg);
	}
}
