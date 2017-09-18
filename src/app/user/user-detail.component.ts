import { Component, Input, OnChanges } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { SelectItem } from 'primeng/primeng';
import { UserService } from './user.service';
import { RoleService } from '../role/role.service';
import { Role } from '../role/role';
import { User } from './user';

@Component({
    selector: 'user-detail',
    templateUrl: './user-detail.component.html'
})
export class UserDetailComponent implements OnChanges {
    @Input() user: User;
    userForm: FormGroup;
    nameChangeLog: string[] = [];
    rolesList;
    userRolesList: SelectItem[];
    selectedUserRoles: string[];

    constructor(
        private fb: FormBuilder,
        private us: UserService,
        private rs: RoleService
    ) {
        this.getRoles();
        this.createForm();
        this.logNameChange();
    }

    createForm() {
        this.userForm = this.fb.group({
            name: '',
            roles: '',
            active: '',
            creationDate: '',
            email: '',
            firstname: '',
            lastname: '',
            phone1: '',
            phone2: '',
            preferredcontact: '',
        });
        this.userForm.valueChanges.subscribe(data => {

        })
    }

    getRoles() {
        this.userRolesList = [];
        this.rs.getRoles()
            .then(roles => {
                roles.map((r) => {
                    this.userRolesList.push({ label: r.name, value: r.id });
                })
            });
    }

    ngOnChanges() {
        this.userForm.reset({
            name: this.user.name,
            roles: this.user.roles,
            active: this.user.active,
            email: this.user.email,
            firstname: this.user.firstname,
            lastname: this.user.lastname,
            phone1: this.user.phone1,
            phone2: this.user.phone2,
            preferredcontact: this.user.preferredcontact,
        });

    }

    onSubmit() {
        this.user = this.prepareSaveUser();
    }

    prepareSaveUser(): User {
        const formModel = this.userForm.value;

        const saveUser: User = {
            id: this.user.id,
            name: formModel.name as string,
            active: formModel.active,
            roles: formModel.roles,
            email: formModel.email,
            firstname: formModel.firstname,
            lastname: formModel.lastname,
            phone1: formModel.phone1,
            phone2: formModel.phone2,
            preferredcontact: formModel.preferredcontact,

        }
        // console.log('save', saveUser)
        if (saveUser.id !== null) {
            this.us.UpdateUser(saveUser);
        } else {
            this.us.CreateUser(saveUser);
        }
        return saveUser;
    }

    delete() {
        this.us.DeleteUser(this.user);
    }

    revert() { this.ngOnChanges(); }

    logNameChange() {
        const nameControl = this.userForm.get('name');
        nameControl.valueChanges.forEach(
            (value: string) => this.nameChangeLog.push(value)
        )
    }

}