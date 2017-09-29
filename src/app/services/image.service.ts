import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from "rxjs/Observable";

/* This is a exclusive service to manage images in the server from the front end */
@Injectable()
export class ImageService {
  private headers:Headers;
  private urlImg:string;
  private options:RequestOptions;
  public serverURL:string;
  
  /**
  The constructor initialize the variables declared above.
  @param http The injection of the Http service
  */
  constructor(private http:Http){
    this.headers = new Headers({ 'Content-Type': 'application/json' });
    this.options = new RequestOptions({ headers: this.headers });
    this.serverURL = "http://localhost:3000/api/imageController/";
  }

  /**
  * This method consumes a web service who remove an image from the image folder in the server
  * @param wilcard controller name for the communication with the server
  * @param imageName The name of the image to remove
  */
  public delete(wildcard: string, imageName: string) {
    return this.http.delete(`${this.serverURL}${wildcard}/${imageName}`)
                    .map(this.extractData).catch(this.handleError);
  }

  /**
  * This method extract the information of the response and get the correct json string
  * @param res The response parameter from the server
  * @return Json data with information about response
  */ 
  private extractData(res: Response):string {
    let body = res.json();
    return body || {};
  }

  /**
  * This method is an error handler that we use to detect a fail connection of the server
  * @param error The error sent from server
  */
  private handleError(error: any) {
    let errMsg = (error.message) ? error.message :
    error.status ? `${JSON.parse(error._body).message}` : 'Unable connect to server';
    return Observable.throw(errMsg);
  }
}
