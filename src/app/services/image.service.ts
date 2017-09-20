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
    this.serverURL = "http://localhost:3000/api/imageController/upload";
  }
}
