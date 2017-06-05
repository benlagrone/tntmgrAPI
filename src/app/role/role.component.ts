import { Component, OnInit } from '@angular/core';
import { RoleService } from './role.service';
import { Role } from './role';

@Component({
  selector: 'app-role',
  templateUrl: './role.component.html',
  styleUrls: ['./role.component.css']
})
export class RoleComponent implements OnInit {
role: Role[] = [];
  private errorMessage: any = '';
  constructor(private rs: RoleService) { }

  ngOnInit() {
    this.getRoles();

  }
  getRoles(): void {
    this.rs.getRoles()
      .then( roles => {
        this.role = roles
      },
      error => this.errorMessage = <any>error
      );
  }
}
