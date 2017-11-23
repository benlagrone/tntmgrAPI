import { Injectable } from '@angular/core';
import { Headers, Http, Response } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import { Observable } from 'rxjs/Observable';
import { Category } from './category';

@Injectable()

export class CategoryService {

  private headers = new Headers({ 'Content-Type': 'application/json' });
  private categoryUrl = 'http://talentmanagerapi.azurewebsites.net/api/categories';

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


  UpdateCategory(category: Category): Promise<any> {
    const headers = new Headers();
    headers.append('accept', 'application/json');
    return this.http.put(this.categoryUrl + '/' + category.id, category, { headers })
      .toPromise()
      .then((response) => {
        const data: Category = response.json() || {};
        return data;
      })
      .catch((err) => {
        Promise.reject(err);
      })
  }

  DeleteCategory(category: Category): Promise<any> {
    const headers = new Headers();
    return this.http.delete(this.categoryUrl + '/' + category.id, { headers: headers })
      .toPromise()
      .then((response) => {
        console.log(response)
      })
      .catch((err) => {
        Promise.reject(err);
      })
  }

  CreateCategory(category: Category): Promise<any> {
    const headers = new Headers();
    headers.append('accept', 'application/json');
    return this.http.post(this.categoryUrl, category, { headers: headers })
      .toPromise()
      .then((response) => {
        const data: Category = response.json() || {};
        return data;
      })
      .catch((err) => {
        Promise.reject(err);
      })
  }

}
