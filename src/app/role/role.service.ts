import { Injectable } from '@angular/core';
import { Headers, Http, Response } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import { Observable } from 'rxjs/Observable';
import { Role } from './role';

@Injectable()
export class RoleService {

  private headers = new Headers({ 'Content-Type': 'application/json' });
  private roleUrl = 'http://localhost:8080/api/role';

  constructor(private http: Http) { }

  getRoles(): Promise<Role[]> {
    console.log('service')
    return this.http.get(this.roleUrl)
      .toPromise()
      .then(this.extractData)
      .catch(this.handleError);
  }
  private extractData(res: Response) {
    let body = res.json();
    console.log(body)
    return body || [];
  }
  private handleError(error: any) {

    let errMsg = (error.message) ? error.message :
      error.status ? `${error.status} - ${error.statusText}` : 'Server error';
    console.error(errMsg); // log to console instead
    return Observable.throw(errMsg);
  }

}
