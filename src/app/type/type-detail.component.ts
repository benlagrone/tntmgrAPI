import { Component, Input, OnChanges, OnDestroy } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { SelectItem } from 'primeng/primeng';
import { TypeService } from './type.service';
import { Type } from '../type/type';

@Component({
    selector: 'type-detail',
    templateUrl: './type-detail.component.html'
})
export class TypeDetailComponent implements OnChanges {
    @Input() type: Type;
    typeForm: FormGroup;
    nameChangeLog: string[] = [];

    constructor(
        private fb: FormBuilder,
        private ts: TypeService
    ) {
        this.createForm();
        this.logNameChange();
    }

    createForm() {
        this.typeForm = this.fb.group({
            name: '',
            description: '',
            active: ''
        });
        this.typeForm.valueChanges.subscribe(data => {

        })
    }

    ngOnChanges() {
        this.typeForm.reset({
            name: this.type.name,
            description: this.type.description,
            active: this.type.active
        });

    }

    onSubmit() {
        this.type = this.prepareSaveType();

    }

    prepareSaveType(): Type {
        const formModel = this.typeForm.value;

        const saveType: Type = {
            id: this.type.id,
            name: formModel.name as string,
            description: formModel.description,
            active: formModel.active
        }
        if (saveType.id !== null) {
            this.ts.UpdateType(saveType);
        } else {
            this.ts.CreateType(saveType);
        }
        return saveType;
    }

    delete() {
        this.ts.DeleteType(this.type);
    }

    revert() { this.ngOnChanges(); }

    logNameChange() {
        const nameControl = this.typeForm.get('name');
        nameControl.valueChanges.forEach(
            (value: string) => this.nameChangeLog.push(value)
        )
    }

}