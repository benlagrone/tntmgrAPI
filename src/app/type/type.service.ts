import { Injectable } from '@angular/core';
import { Headers, Http, Response } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import { Observable } from 'rxjs/Observable';
import { Type } from './type';

@Injectable()

export class TypeService {

  private headers = new Headers({ 'Content-Type': 'application/json' });
  private typeUrl = 'http://talentmanagerapi.azurewebsites.net/api/types';

  constructor(private http: Http) { }

  getTypes(): Promise<Type[]> {
    return this.http.get(this.typeUrl)
      .toPromise()
      .then(this.extractData)
      .catch(this.handleError);
  }
  private extractData(res: Response) {
    let body = res.json();
    return body || [];
  }
  private handleError(error: any) {

    let errMsg = (error.message) ? error.message :
      error.status ? `${error.status} - ${error.statusText}` : 'Server error';
    console.error(errMsg); // log to console instead
    return Observable.throw(errMsg);
  }


  UpdateType(type: Type): Promise<any> {
    const headers = new Headers();
    headers.append('accept', 'application/json');
    return this.http.put(this.typeUrl + '/' + type.id, type, { headers })
      .toPromise()
      .then((response) => {
        const data: Type = response.json() || {};
        return data;
      })
      .catch((err) => {
        Promise.reject(err);
      })
  }

  DeleteType(type: Type): Promise<any> {
    const headers = new Headers();
    return this.http.delete(this.typeUrl + '/' + type.id, { headers: headers })
      .toPromise()
      .then((response) => {
        console.log(response)
      })
      .catch((err) => {
        Promise.reject(err);
      })
  }

  CreateType(type: Type): Promise<any> {
    const headers = new Headers();
    headers.append('accept', 'application/json');
    return this.http.post(this.typeUrl, type, { headers: headers })
      .toPromise()
      .then((response) => {
        const data: Type = response.json() || {};
        return data;
      })
      .catch((err) => {
        Promise.reject(err);
      })
  }

}
