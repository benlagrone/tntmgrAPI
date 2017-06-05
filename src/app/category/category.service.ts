import { Injectable } from '@angular/core';
import { Headers, Http, Response } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import { Observable } from 'rxjs/Observable';
import { Category } from './category';

@Injectable()

export class CategoryService {

  private headers = new Headers({ 'Content-Type': 'application/json' });
  private categoryUrl = 'http://localhost:8080/api/category';

  constructor(private http: Http) { }

    getCategories(): Promise<Category[]> {
    return this.http.get(this.categoryUrl)
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

}
