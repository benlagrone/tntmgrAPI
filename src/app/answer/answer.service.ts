import { Injectable } from '@angular/core';
import { Headers, Http, Response } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import { Observable } from 'rxjs/Observable';
import { Answer } from './answer';

@Injectable()
export class AnswerService {

  private headers = new Headers({ 'Content-Type': 'application/json' });
  private answerUrl = 'http://talentmanagerapi.azurewebsites.net/api/answers';

  constructor(private http: Http) {
      }

  getAnswers(): Promise<Answer[]> {
    return this.http.get(this.answerUrl)
      .toPromise()
      .then(this.extractData)
      .catch(this.handleError);
  }

  getAnswer(id): Promise<Answer> {
    return this.http.get(this.answerUrl + id)
      .toPromise()
      .then(this.extractData)
      .catch(this.handleError);
  }

  getAnswersByQuestions(data): Promise<Answer[]>{
        const headers = new Headers();
        headers.append('accept', 'application/json');
      return this.http.post(this.answerUrl+'/answersbyquestions',data,{ headers: headers })
      .toPromise()
      .then(this.extractData)
      .catch(this.handleError);
  }

  getAnswersByQuestion(data): Promise<Answer[]>{
    const headers = new Headers();
    headers.append('accept', 'application/json');
    return this.http.get(this.answerUrl+'/answersbyquestionid/'+data,{ headers: headers })
    .toPromise()
    .then(this.extractData)
    .catch(this.handleError);
}
//   listbyquestionid

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


    UpdateAnswer(answer: Answer): Promise<any> {
        const headers = new Headers();
        headers.append('accept', 'application/json');
        return this.http.put(this.answerUrl + '/' + answer.id, answer, { headers: headers })
            .toPromise()
            .then((response) => {
                const data: Answer = response.json() || {};
                return data;
            })
            .catch((err) => {
                Promise.reject(err);
            });
    }


    DeleteAnswer(answer: Answer): Promise<any> {
        const headers = new Headers();
        headers.append('accept', 'application/json');
        return this.http.delete(this.answerUrl + '/' + answer.id, { headers: headers })
            .toPromise()
            .then((response) => {
    
                console.log(response)
            })
            .catch((err) => {
                Promise.reject(err);
            });
    }


    CreateAnswer(answer: Answer): Promise<any> {
        const headers = new Headers();
        headers.append('accept', 'application/json');
        return this.http.post(this.answerUrl, answer, { headers: headers })
            .toPromise()
            .then((response) => {
                const data: Answer = response.json() || {};
                return data;
            })
            .catch((err) => {
                Promise.reject(err);
            });
    }


}
