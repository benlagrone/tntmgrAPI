import { Component, Input, OnChanges, OnDestroy } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { SelectItem } from 'primeng/primeng';
import { GroupService } from './group.service';
import { Group } from '../group/group';

@Component({
    selector: 'group-detail',
    templateUrl: './group-detail.component.html'
})
export class GroupDetailComponent implements OnChanges {
    @Input() group: Group;
    groupForm: FormGroup;
    nameChangeLog: string[] = [];
    userGroupsList: SelectItem[];
    selectedUserGroups: string[];

    constructor(
        private fb: FormBuilder,
        private gs: GroupService
    ) {
        this.createForm();
        this.logNameChange();
    }

    createForm() {
        this.groupForm = this.fb.group({
            name: '',
            description: '',
            active: '',
        });
        this.groupForm.valueChanges.subscribe(data => {

        })
    }

    ngOnChanges() {
        this.groupForm.reset({
            name: this.group.name,
            description: this.group.description,
            active: this.group.active,
        });

    }

    onSubmit() {
        this.group = this.prepareSaveGroup();

    }

    prepareSaveGroup(): Group {
        const formModel = this.groupForm.value;
console.log('this', this)
        const saveGroup: Group = {
            id: this.group.id,
            name: formModel.name as string,
            description: formModel.description,
            active: formModel.active,
        }
        if (saveGroup.id !== null) {
            this.gs.UpdateGroup(saveGroup);
        } else {
            this.gs.CreateGroup(saveGroup);
        }
        return saveGroup;
    }

    delete() {
        this.gs.DeleteGroup(this.group);
    }

    revert() { this.ngOnChanges(); }

    logNameChange() {
        const nameControl = this.groupForm.get('name');
        nameControl.valueChanges.forEach(
            (value: string) => this.nameChangeLog.push(value)
        )
    }

}