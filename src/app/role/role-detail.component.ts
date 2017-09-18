import { Component, Input, OnChanges, OnDestroy } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { SelectItem } from 'primeng/primeng';
import { RoleService } from './role.service';
import { Role } from '../role/role';

@Component({
    selector: 'role-detail',
    templateUrl: './role-detail.component.html'
})
export class RoleDetailComponent implements OnChanges {
    @Input() role: Role;
    roleForm: FormGroup;
    nameChangeLog: string[] = [];
    userRolesList: SelectItem[];
    selectedUserRoles: string[];

    constructor(
        private fb: FormBuilder,
        private rs: RoleService
    ) {
        this.createForm();
        this.logNameChange();
    }

    createForm() {
        this.roleForm = this.fb.group({
            name: '',
            description: '',
            active: '',
        });
        this.roleForm.valueChanges.subscribe(data => {

        })
    }

    ngOnChanges() {
        this.roleForm.reset({
            name: this.role.name,
            description: this.role.description,
            active: this.role.active,
        });

    }

    onSubmit() {
        this.role = this.prepareSaveRole();

    }

    prepareSaveRole(): Role {
        const formModel = this.roleForm.value;
console.log('this', this)
        const saveRole: Role = {
            id: this.role.id,
            name: formModel.name as string,
            description: formModel.description,
            active: formModel.active,
        }
        if (saveRole.id !== null) {
            this.rs.UpdateRole(saveRole);
        } else {
            this.rs.CreateRole(saveRole);
        }
        return saveRole;
    }

    delete() {
        this.rs.DeleteRole(this.role);
    }

    revert() { this.ngOnChanges(); }

    logNameChange() {
        const nameControl = this.roleForm.get('name');
        nameControl.valueChanges.forEach(
            (value: string) => this.nameChangeLog.push(value)
        )
    }

}