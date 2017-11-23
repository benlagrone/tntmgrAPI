import { Injectable } from '@angular/core';
import { Headers, Http, Response } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import { Observable } from 'rxjs/Observable';
import { Question } from './question';

@Injectable()

export class QuestionService {
  private headers = new Headers({ 'Content-Type': 'application/json' });
  // private questionUrl = 'http://localhost:8000/api/questions';
  private questionUrl = 'http://talentmanagerapi.azurewebsites.net/api/questions';


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

  getQuestionLibraries(data): Promise<Question[]> {
    console.log('data',data)
    return this.http.post(this.questionUrl+'/listByLibs', data)
    .toPromise()
    .then(this.extractData)
    .catch(this.handleError);
  }

  UpdateQuestion(question: Question): Promise<any> {
    const headers = new Headers();
    headers.append('accept', 'application/json');
    return this.http.put(this.questionUrl + '/' + question.id, question, { headers })
      .toPromise()
      .then((response) => {
        const data: Question = response.json() || {};
        return data;
      })
      .catch((err) => {
        Promise.reject(err);
      })
  }

  DeleteQuestion(question: Question): Promise<any> {
    const headers = new Headers();
    return this.http.delete(this.questionUrl + '/' + question.id, { headers: headers })
      .toPromise()
      .then((response) => {
        console.log(response)
      })
      .catch((err) => {
        Promise.reject(err);
      })
  }

  CreateQuestion(question: Question): Promise<any> {
    const headers = new Headers();
    headers.append('accept', 'application/json');
    return this.http.post(this.questionUrl, question, { headers: headers })
      .toPromise()
      .then((response) => {
        const data: Question = response.json() || {};
        return data;
      })
      .catch((err) => {
        Promise.reject(err);
      })
  }
}
