import { Component, OnInit } from '@angular/core';
import { UserService } from './user.service';
import { User } from './user';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  user: User[] = [];
  private errorMessage: any = '';
  constructor(private us: UserService) { }

  ngOnInit() {
    this.getUsers();

  }
  getUsers(): void {
    this.us.getUsers()
      .then( users => {
        this.user = users
      },
      error => this.errorMessage = <any>error
      );
  }
}
