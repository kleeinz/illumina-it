import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class SharedService {
  // Observable string sources
  private componentMethodCallSource = new Subject<any>();
  public data:any;
  // Observable string streams
  componentMethodCalled = this.componentMethodCallSource.asObservable();
  // Service message commands
  public callComponentMethod() {
    this.componentMethodCallSource.next();
  }

  public sendData(){
    this.componentMethodCallSource.next();
  }
}
