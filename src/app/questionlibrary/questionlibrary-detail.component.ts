import { Component, Input, OnChanges, OnDestroy } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { SelectItem } from 'primeng/primeng';
import { QuestionLibraryService } from './questionlibrary.service';
import { QuestionLibrary } from '../questionlibrary/questionlibrary';

@Component({
    selector: 'questionlibrary-detail',
    templateUrl: './questionlibrary-detail.component.html'
})
export class QuestionLibraryDetailComponent implements OnChanges {
    @Input() questionlibrary: QuestionLibrary;
    questionlibraryForm: FormGroup;
    nameChangeLog: string[] = [];

    constructor(
        private fb: FormBuilder,
        private cs: QuestionLibraryService
    ) {
        this.createForm();
        this.logNameChange();
    }

    createForm() {
        this.questionlibraryForm = this.fb.group({
            name: '',
            description: '',
            active:''
        });
        this.questionlibraryForm.valueChanges.subscribe(data => {

        })
    }

    ngOnChanges() {
        this.questionlibraryForm.reset({
            name: this.questionlibrary.name,
            description: this.questionlibrary.description,
            active:this.questionlibrary.active
        });

    }

    onSubmit() {
        this.questionlibrary = this.prepareSaveQuestionLibrary();

    }

    prepareSaveQuestionLibrary(): QuestionLibrary {
        const formModel = this.questionlibraryForm.value;

        const saveQuestionLibrary: QuestionLibrary = {
            id: this.questionlibrary.id,
            name: formModel.name as string,
            description: formModel.description,
            active: formModel.active
        }
        if (saveQuestionLibrary.id !== null) {
            this.cs.UpdateQuestionLibrary(saveQuestionLibrary);
        } else {
            this.cs.CreateQuestionLibrary(saveQuestionLibrary);
        }
        return saveQuestionLibrary;
    }

    delete() {
        this.cs.DeleteQuestionLibrary(this.questionlibrary);
    }

    revert() { this.ngOnChanges(); }

    logNameChange() {
        const nameControl = this.questionlibraryForm.get('name');
        nameControl.valueChanges.forEach(
            (value: string) => this.nameChangeLog.push(value)
        )
    }

}