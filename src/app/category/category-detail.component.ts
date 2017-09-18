import { Component, Input, OnChanges, OnDestroy } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { SelectItem } from 'primeng/primeng';
import { CategoryService } from './category.service';
import { Category } from '../category/category';

@Component({
    selector: 'category-detail',
    templateUrl: './category-detail.component.html'
})
export class CategoryDetailComponent implements OnChanges {
    @Input() category: Category;
    categoryForm: FormGroup;
    nameChangeLog: string[] = [];
    // userCategorysList: SelectItem[];
    // selectedUserCategorys: string[];

    constructor(
        private fb: FormBuilder,
        private cs: CategoryService
    ) {
        this.createForm();
        this.logNameChange();
    }

    createForm() {
        this.categoryForm = this.fb.group({
            name: '',
            description: '',
            active:''
        });
        this.categoryForm.valueChanges.subscribe(data => {

        })
    }

    ngOnChanges() {
        this.categoryForm.reset({
            name: this.category.name,
            description: this.category.description,
            active:this.category.active
        });

    }

    onSubmit() {
        this.category = this.prepareSaveCategory();

    }

    prepareSaveCategory(): Category {
        const formModel = this.categoryForm.value;

        const saveCategory: Category = {
            id: this.category.id,
            name: formModel.name as string,
            description: formModel.description,
            active: formModel.active
        }
        if (saveCategory.id !== null) {
            this.cs.UpdateCategory(saveCategory);
        } else {
            this.cs.CreateCategory(saveCategory);
        }
        return saveCategory;
    }

    delete() {
        this.cs.DeleteCategory(this.category);
    }

    revert() { this.ngOnChanges(); }

    logNameChange() {
        const nameControl = this.categoryForm.get('name');
        nameControl.valueChanges.forEach(
            (value: string) => this.nameChangeLog.push(value)
        )
    }

}