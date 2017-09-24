import { Injectable } from '@angular/core';
import { Headers, Http, Response } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import { Observable } from 'rxjs/Observable';
import { QuestionLibrary } from './questionlibrary';

@Injectable()

export class QuestionLibraryService {

  private headers = new Headers({ 'Content-Type': 'application/json' });
  private questionlibraryUrl = 'http://localhost:8000/api/questionlibraries';

  constructor(private http: Http) { }

  getQuestionLibraries(): Promise<QuestionLibrary[]> {
    return this.http.get(this.questionlibraryUrl)
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


  UpdateQuestionLibrary(questionlibrary: QuestionLibrary): Promise<any> {
    const headers = new Headers();
    headers.append('accept', 'application/json');
    return this.http.put(this.questionlibraryUrl + '/' + questionlibrary.id, questionlibrary, { headers })
      .toPromise()
      .then((response) => {
        const data: QuestionLibrary = response.json() || {};
        return data;
      })
      .catch((err) => {
        Promise.reject(err);
      })
  }

  DeleteQuestionLibrary(questionlibrary: QuestionLibrary): Promise<any> {
    const headers = new Headers();
    return this.http.delete(this.questionlibraryUrl + '/' + questionlibrary.id, { headers: headers })
      .toPromise()
      .then((response) => {
        console.log(response)
      })
      .catch((err) => {
        Promise.reject(err);
      })
  }

  CreateQuestionLibrary(questionlibrary: QuestionLibrary): Promise<any> {
    const headers = new Headers();
    headers.append('accept', 'application/json');
    return this.http.post(this.questionlibraryUrl, questionlibrary, { headers: headers })
      .toPromise()
      .then((response) => {
        const data: QuestionLibrary = response.json() || {};
        return data;
      })
      .catch((err) => {
        Promise.reject(err);
      })
  }

}
