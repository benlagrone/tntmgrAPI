import { Component, OnInit } from '@angular/core';
import { CategoryService } from './category.service';
import { Category } from './category';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {

  list: Category[] = [];
  private title = "Categories";
  isLoading = false;
  selectedCategory: Category;
  private errorMessage: any = '';

  constructor(private qs: CategoryService) { }

  ngOnInit() {
    this.getCategories();
  }

  getCategories(): void {
    this.qs.getCategories()
      .then(category => {
        this.list = category;
        this.isLoading = false;
      },
      error => this.errorMessage = <any>error
      );
    this.selectedCategory = undefined;
  }

  addNewCategory() {
    const noCategory = {
      "id": null,
      "name": null,
      "description": null,
      "active": null
    }
    this.selectedCategory = noCategory;
  }
  select(category: Category) {
    this.selectedCategory = category;
  }
}
