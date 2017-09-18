import { Injectable } from '@angular/core';
import { Headers, Http, Response } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import { Observable } from 'rxjs/Observable';
import { QuestionLibrary } from './questionlibrary';

@Injectable()

export class QuestionlibraryService {

private headers = new Headers({ 'Content-Type': 'application/json' });
  private questionlibraryUrl = 'http://localhost:8000/api/questionlibrary';

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

}
