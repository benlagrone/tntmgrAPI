import { Injectable } from '@angular/core';
import { Headers, Http, Response } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import { Observable } from 'rxjs/Observable';
import { Group } from './group';

@Injectable()
export class GroupService {

  private headers = new Headers({ 'Content-Type': 'application/json' });
  private groupUrl = 'http://localhost:8000/api/groups';

  constructor(private http: Http) { }

  getGroups(): Promise<Group[]> {
    // console.log('service')
    return this.http.get(this.groupUrl)
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

UpdateGroup(group: Group): Promise<any>{
  console.log('group', group)
  const headers = new Headers();
  headers.append('accept', 'application/json');
  return this.http.put(this.groupUrl + '/' + group.id, group, {headers: headers})
  .toPromise()
  .then((response) => {
    const data: Group = response.json() || {};
    return data;
  })
  .catch((err) => {
    Promise.reject(err)
  })
}

  DeleteGroup(group: Group): Promise<any>{
    const headers = new Headers();
        headers.append('accept', 'application/json');
        return this.http.delete(this.groupUrl + '/' + group.id, {headers: headers})
        .toPromise()
        .then((response) => {
          console.log(response)
        })
        .catch((err) => {
          Promise.reject(err);
        })
  }

  CreateGroup(group: Group): Promise<any>{
    const headers = new Headers();
    headers.append('accept', 'application/json');
    return this.http.post(this.groupUrl, group, {headers: headers})
    .toPromise()
    .then((response) => {
      const data: Group = response.json() || {};
      return data;
    })
    .catch((err) => {
      Promise.reject(err);
    })
  }
}
