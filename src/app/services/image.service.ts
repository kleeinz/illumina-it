import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { Observable } from "rxjs/Observable";

@Injectable()
export class ImageService {
  private headers:Headers;
  private urlImg:string;
  private options:RequestOptions;
  public serverURL:string;
  
  constructor(private http:Http, private router: Router){
    this.headers = new Headers({ 'Content-Type': 'application/json' });
    this.options = new RequestOptions({ headers: this.headers });
    this.serverURL = "http://localhost:3000/api/imageController/";
  }

  public delete(wildcard: string, imageName: string) {
    return this.http.delete(`${this.serverURL}${wildcard}/${imageName}`)
                    .map(this.extractData).catch(this.handleError);
  }

  private extractData(res: Response):string {
    let body = res.json();
    return body || {};
  }

  private handleError(error: any) {
    let errMsg = (error.message) ? error.message :
    error.status ? `${JSON.parse(error._body).message}` : 'Unable connect to server';
    return Observable.throw(errMsg);
  }
}
