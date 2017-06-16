import { Injectable } from '@angular/core';
import { Headers, Http, Response } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import { BehaviorSubject } from 'rxjs/Rx';
import { Observable } from 'rxjs/Observable';
import { User } from './user';

export class UserForm extends User {
  public edit = true;
  public saved = false;
  public fresh = false;
}

@Injectable()
export class UserService {

  private headers = new Headers({ 'Content-Type': 'application/json' });
  private userUrl = 'http://localhost:8080/api/user';
  private _user: BehaviorSubject<User>;
  private _users: BehaviorSubject<Array<User>>;

  constructor(private http: Http) {
        this._user = new BehaviorSubject(null);
        this._users = new BehaviorSubject([]);
      }

  getUsers(): Promise<User[]> {
    return this.http.get(this.userUrl)
      .toPromise()
      .then(this.extractData)
      .catch(this.handleError);
  }

  getUser(id): Promise<User> {
    return this.http.get(this.userUrl + id)
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


    UpdateUser(user: User): Promise<User> {
        const headers = new Headers();
        headers.append('accept', 'application/json');
        return this.http.put(this.userUrl + '/' + user._id, user, { headers: headers })
            .toPromise()
            .then((response) => {
                const data: User = response.json() || {};
                return data;
            })
            .catch((err) => {
                Promise.reject(err);
            });
    }


    DeleteUser(user: User): Promise<User> {
        const headers = new Headers();
        headers.append('accept', 'application/json');
        return this.http.delete(this.userUrl + '/' + user._id, { headers: headers })
            .toPromise()
            .then((response) => {
                const data: User = response.json() || {};
                return data;
            })
            .catch((err) => {
                Promise.reject(err);
            });
    }


    CreateUser(user: User): Promise<User> {
        const headers = new Headers();
        headers.append('accept', 'application/json');
        return this.http.post(this.userUrl, user, { headers: headers })
            .toPromise()
            .then((response) => {
                const data: User = response.json() || {};
                return data;
            })
            .catch((err) => {
                Promise.reject(err);
            });
    }


}
