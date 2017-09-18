import { Component, OnInit, ChangeDetectorRef, AfterViewChecked } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { UserService } from './user.service';
import { User } from './user';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {
  list: User[] = [];
  isLoading = false;
  selectedUser: User;

  constructor(
    private us: UserService
  ) { }


  ngOnInit() {
    this.getUsers();
  }
  getUsers(): void {
    this.isLoading = true;
    this.us.getUsers()
      .then(users => {
        this.list = users
        this.isLoading = false;
      })
    this.selectedUser = undefined;
  }

addNew(){
  const noUser = {
  "id": null,
  "name": null,
  "email": null,
  "firstname": null,
  "lastname": null,
  "phone1": null,
  "phone2": null,
  "preferredcontact": null,
  "active": false,
  "roles": []
}
  this.selectedUser = noUser;
}

  select(user: User) { 
    console.log(user)
    this.selectedUser = user 
  }

}
