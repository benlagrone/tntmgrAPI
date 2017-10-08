import { Injectable } from '@angular/core';
import { Headers, Http, Response } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import { Observable } from 'rxjs/Observable';
import { Assessment } from './assessment';

@Injectable()
export class AssessmentService {

  private headers = new Headers({ 'Content-Type': 'application/json' });
  private assessmentUrl = 'http://localhost:8000/api/assessments';

  constructor(private http: Http) {
      }

  getAssessments(): Promise<Assessment[]> {
    return this.http.get(this.assessmentUrl)
      .toPromise()
      .then(this.extractData)
      .catch(this.handleError);
  }

  getAssessment(id): Promise<Assessment> {
    return this.http.get(this.assessmentUrl + id)
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


    UpdateAssessment(assessment: Assessment): Promise<any> {
        const headers = new Headers();
        headers.append('accept', 'application/json');
        return this.http.put(this.assessmentUrl + '/' + assessment.id, assessment, { headers: headers })
            .toPromise()
            .then((response) => {
                const data: Assessment = response.json() || {};
                return data;
            })
            .catch((err) => {
                Promise.reject(err);
            });
    }


    DeleteAssessment(assessment: Assessment): Promise<any> {
        const headers = new Headers();
        headers.append('accept', 'application/json');
        return this.http.delete(this.assessmentUrl + '/' + assessment.id, { headers: headers })
            .toPromise()
            .then((response) => {
    
                console.log(response)
            })
            .catch((err) => {
                Promise.reject(err);
            });
    }


    CreateAssessment(assessment: Assessment): Promise<any> {
        const headers = new Headers();
        headers.append('accept', 'application/json');
        return this.http.post(this.assessmentUrl, assessment, { headers: headers })
            .toPromise()
            .then((response) => {
                const data: Assessment = response.json() || {};
                return data;
            })
            .catch((err) => {
                Promise.reject(err);
            });
    }


}
