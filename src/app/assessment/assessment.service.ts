import { Injectable } from '@angular/core';
import { Headers, Http, Response } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import { Observable } from 'rxjs/Observable';
import { Assessment } from './assessment';

@Injectable()

export class AssessmentService {

  private headers = new Headers({ 'Content-Type': 'application/json' });
  private assessmentUrl = 'http://localhost:8080/api/assessment';


  constructor(private http: Http) { }

  getAssessments(): Promise<Assessment[]> {
    return this.http.get(this.assessmentUrl)
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

