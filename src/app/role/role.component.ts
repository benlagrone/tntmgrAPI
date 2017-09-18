import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { RoleService } from './role.service';
import { Role } from './role';

@Component({
  selector: 'app-role',
  templateUrl: './role.component.html',
  styleUrls: ['./role.component.css']
})
export class RoleComponent implements OnInit {
  list: Role[] = [];
  isLoading = false;
  selectedRole: Role;
  private title = "role";
  private errorMessage: any = '';

  constructor(private rs: RoleService)
  { }

  ngOnInit() {
    this.getRoles();
  }
  getRoles(): void {
    this.rs.getRoles()
      .then(roles => {
        this.list = roles
        this.isLoading = false;
      },
      error => this.errorMessage = <any>error
      );
    this.selectedRole = undefined;
  }

  addNewRole() {
    const noRole = {
      "id": null,
      "name": null,
      "description": null,
      "active": null,
    }
    this.selectedRole = noRole;
  }
  select(role: Role) {
    this.selectedRole = role;
    console.log('this', this)
  }

}
