import { Component, OnInit } from '@angular/core';
import { CategoryService } from './category.service';
import { Category } from './category';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {

  category: Category[] = [];
  private errorMessage: any = '';
  constructor(private qs: CategoryService) { }

  ngOnInit() {
    this.getCategories();
  }

  getCategories(): void {
    this.qs.getCategories()
      .then(category => {
        this.category = category;
      },
      error => this.errorMessage = <any>error
      );
  }

}
