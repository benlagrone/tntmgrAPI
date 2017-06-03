import { Injectable } from '@angular/core';
import { Headers, Http };
import 'rxjs/add/operators/toPromise';

@Injectable()
export class User {
  name: String;
  role: [];
  active: Boolean;
  creationDate: Date
}
export class UserService {

  constructor(private http: Http) { }
private usersUrl = 'http://localhost:8080/api/user'
  getUsers(): Promise<User>[] {
    return this.http.get(this.usersUrl)
    .toPromise()
    .then(response => response.json().data as User[])
    .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.error('An error happened', error);
    return Promise.reject(error.message || error);
  }

}
