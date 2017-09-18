import { Component, OnInit } from '@angular/core';
import { TypeService } from './type.service';
import { Type } from './type';

@Component({
  selector: 'app-type',
  templateUrl: './type.component.html',
  styleUrls: ['./type.component.css']
})
export class TypeComponent implements OnInit {

  list: Type[] = [];
  private title = "Categories";
  isLoading = false;
  selectedType: Type;
  private errorMessage: any = '';

  constructor(private ts: TypeService) { }

  ngOnInit() {
    this.getTypes();
  }

  getTypes(): void {
    this.ts.getTypes()
      .then(type => {
        this.list = type;
        this.isLoading = false;
      },
      error => this.errorMessage = <any>error
      );
    this.selectedType = undefined;
  }

  addNewType() {
    const noType = {
      "id": null,
      "name": null,
      "description": null,
      "active": null
    }
    this.selectedType = noType;
  }
  select(type: Type) {
    this.selectedType = type;
  }
}
