import { Injectable } from '@angular/core';
import { Headers, Http, Response } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import { Observable } from 'rxjs/Observable';
import { Question } from './question';

@Injectable()

export class QuestionService {
  private headers = new Headers({ 'Content-Type': 'application/json' });
  private questionUrl = 'http://localhost:8080/api/question';
  

  constructor(private http: Http) { }

  getQuestions(): Promise<Question[]> {
    return this.http.get(this.questionUrl)
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
