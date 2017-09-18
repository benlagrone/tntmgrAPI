import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { GroupService } from './group.service';
import { Group } from './group';

@Component({
  selector: 'app-group',
  templateUrl: './group.component.html',
  styleUrls: ['./group.component.css']
})
export class GroupComponent implements OnInit {
  list: Group[] = [];
  isLoading = false;
  selectedGroup: Group;
  private title = "group";
  private errorMessage: any = '';

  constructor(private gs: GroupService)
  { }

  ngOnInit() {
    this.getGroups();
  }
  getGroups(): void {
    this.gs.getGroups()
      .then(groups => {
        this.list = groups
        this.isLoading = false;
      },
      error => this.errorMessage = <any>error
      );
    this.selectedGroup = undefined;
  }

  addNewGroup() {
    const noGroup = {
      "id": null,
      "name": null,
      "description": null,
      "active": null,
    }
    this.selectedGroup = noGroup;
  }
  select(group: Group) {
    this.selectedGroup = group;
    console.log('this', this)
  }

}
