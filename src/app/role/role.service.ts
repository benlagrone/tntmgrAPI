import { Injectable } from '@angular/core';
import { Headers, Http, Response } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import { Observable } from 'rxjs/Observable';
import { Role } from './role';

@Injectable()
export class RoleService {

  private headers = new Headers({ 'Content-Type': 'application/json' });
  private roleUrl = 'http://localhost:8000/api/roles';

  constructor(private http: Http) { }

  getRoles(): Promise<Role[]> {
    // console.log('service')
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

UpdateRole(role: Role): Promise<any>{
  console.log('role', role)
  const headers = new Headers();
  headers.append('accept', 'application/json');
  return this.http.put(this.roleUrl + '/' + role.id, role, {headers: headers})
  .toPromise()
  .then((response) => {
    const data: Role = response.json() || {};
    return data;
  })
  .catch((err) => {
    Promise.reject(err)
  })
}

  DeleteRole(role: Role): Promise<any>{
    const headers = new Headers();
        headers.append('accept', 'application/json');
        return this.http.delete(this.roleUrl + '/' + role.id, {headers: headers})
        .toPromise()
        .then((response) => {
          console.log(response)
        })
        .catch((err) => {
          Promise.reject(err);
        })
  }

  CreateRole(role: Role): Promise<any>{
    const headers = new Headers();
    headers.append('accept', 'application/json');
    return this.http.post(this.roleUrl, role, {headers: headers})
    .toPromise()
    .then((response) => {
      const data: Role = response.json() || {};
      return data;
    })
    .catch((err) => {
      Promise.reject(err);
    })
  }
}
