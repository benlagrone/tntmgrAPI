import { Component, OnInit, ChangeDetectorRef, AfterViewChecked } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { UserService, UserForm } from './user.service';
import { User } from './user';
import * as _ from 'lodash';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {
  list: User[] = [];
  usersForm = new FormGroup({
    name: new FormControl()
  });
  private userFormData: Array<User>;
  private userFormState: Array<boolean>;
  private userFormErrors: Array<string>;
  private usersFormGroup: FormGroup;
  usersItems: User[] = [];
  private title = "users";
  private errorMessage: any = '';
  public formWatchArray = [];
  // usersForm: FormGroup;

  public warnings: Array<string> = [];

  constructor(
    private us: UserService,
    private fb: FormBuilder,
    private cd: ChangeDetectorRef
  ) {
    this.usersFormGroup = new FormGroup({
      // name: new FormControl(),
      users: this.fb.array([])
    });
  }


  ngOnInit() {
    this.getUsers();

  }
  getUsers(): void {
    let usersFormArray2: UserForm[] = [];
    this.us.getUsers()
      .then(users => {
        this.list = users
        this.userFormState = new Array(users.length).fill(false);
        this.userFormErrors = new Array(users.length).fill('');
        this.usersItems = _.clone(users);
        this.usersItems.forEach(userItem => {
          let userForm: UserForm = {
            _id: _.clone(userItem._id),
            name: _.clone(userItem.name),
            role: _.clone(userItem.role),
            active: _.clone(userItem.active),
            creationDate: _.clone(userItem.creationDate),
            edit: true,
            saved: false,
            fresh: false,
          };
          usersFormArray2.push(userForm);
          this.formWatchArray.push(userForm)
        });
        const usersFGs = this.usersItems.map(userItem => this.fb.group(userItem));
        const usersFormArray = this.fb.array(usersFGs);
        this.usersForm.setControl('customUsers', usersFormArray);
        console.log(this)
      },
      error => this.errorMessage = <any>error
      );
  }

  AddRanking(): void {
    this.userFormState.push(true);
    this.userFormErrors.push('');
    let newUser = new UserForm();
    newUser.name = undefined;
    newUser.active = true
    newUser.role = [];
    // newUser.sort = 'Ascending';
    let newUser2 = _.clone(newUser);
    newUser2.fresh = true;
    newUser2.edit = true;
    newUser2.saved = false;
    this.customUsers.push(this.fb.group(newUser));
    this.formWatchArray.push(newUser2);
  }

  EditRanking(index: number): void {
    this.formWatchArray[index].edit = true;
    this.formWatchArray[index].name = this.customUsers.value[index].name;
    this.formWatchArray[index].ods = this.customUsers.value[index].ods;
    this.customUsers.controls[index].value.fresh = false;
    this.formWatchArray[index].fresh = false;
    this.customUsers.value[index].false = false;
    this.formWatchArray[index].sort = this.customUsers.value[index].sort;
    this.formWatchArray[index].type = this.customUsers.value[index].type;
    this.customUsers.controls[index].reset({
      
          _id: this.formWatchArray[index]._id,
          name: this.customUsers.value[index].name,
          role: this.customUsers.value[index].role,
          active: this.customUsers.value[index].active,
          creationDate: this.customUsers.value[index].creationDate,
    });
  }

  get customUsers(): FormArray {
    return this.usersForm.get('customUsers') as FormArray;
  }

  createForm() {
    this.usersForm = this.fb.group({
      title: 'customUsers',
      customUsers: this.fb.array([])
    });
  }

  CancelUser(index) {
    this.warnings = [];
    this.formWatchArray[index].edit = false;
    if (this.formWatchArray[index].fresh) {
      this.customUsers.controls.splice(index, 1);
      this.customUsers.value.splice(index, 1);
      this.formWatchArray.splice(index, 1);
    } else {
      this.customUsers.controls[index].reset({
          _id: this.formWatchArray[index]._id,
          name: this.customUsers.value[index].name,
          role: this.customUsers.value[index].role,
          active: this.customUsers.value[index].active,
          creationDate: this.customUsers.value[index].creationDate,
      });
    }
  }



  UpdateUser(index: number): void {
    if (this.customUsers.value[index].type.toLowerCase() === 'custom') {
      this.us.UpdateUser(
        {
          _id: this.formWatchArray[index]._id,
          name: this.customUsers.value[index].name,
          role: this.customUsers.value[index].role,
          active: this.customUsers.value[index].active,
          creationDate: this.customUsers.value[index].creationDate,
        }
      ).then(
        (ranking) => {
          this.formWatchArray[index].edit = false;
          this.formWatchArray[index].saved = true;
          this.formWatchArray[index].fresh = false;
          this.formWatchArray[index].ods = this.customUsers.value[index].ods;
          // this.formWatchArray[index].displayODS = this.opDataSets.filter((o) => o.id === this.formWatchArray[index].ods)[0].displayName;
          this.cd.markForCheck();
        },
        (err) => {
          // this.ns.SendNotification('rankings', err, NotificationType.Critical);
          console.log(err);
        });
    }
  }

  DeleteUser(index: number): void {
    if (this.customUsers.value[index].type.toLowerCase() === 'custom') {
      this.us.DeleteUser(
        {
          _id: this.formWatchArray[index]._id,
          name: this.customUsers.value[index].name,
      role: this.customUsers.value[index].role,
      active: this.customUsers.value[index].active,
      creationDate: this.customUsers.value[index].creationDate,
        }
      ).then(
        (ranking) => {
          this.customUsers.controls.splice(index, 1);
          this.customUsers.value.splice(index, 1);
          this.formWatchArray.splice(index, 1);
        },
        (err) => {
          // this.ns.SendNotification('rankings', err, NotificationType.Critical);
          console.log(err);
        });
    }
  }


  SaveUser(index) {
    this.us.CreateUser({
      _id: this.customUsers.value[index]._id,
      name: this.customUsers.value[index].name,
      role: this.customUsers.value[index].role,
      active: this.customUsers.value[index].active,
      creationDate: this.customUsers.value[index].creationDate,
    })
      .then(
      (ranking) => {
        this.usersForm.value.customRankings[index]._id = _.clone(ranking._id);
        this.customUsers.value[index]._id = _.clone(ranking._id);
        this.formWatchArray[index]._id = _.clone(ranking._id);
        this.formWatchArray[index].edit = false;
        this.formWatchArray[index].saved = true;
        this.customUsers.value[index].saved = true;
        this.formWatchArray[index].fresh = false;
        this.customUsers.value[index].fresh = false;
        this.formWatchArray[index].ods = this.customUsers.value[index].ods;
        this.customUsers.controls[index].value.fresh = false;
        // this.formWatchArray[index].displayODS = this.opDataSets.filter((o) => o.id === this.formWatchArray[index].ods)[0].displayName;
      },
      (err) => {
        // this.ns.SendNotification('rankings', err, NotificationType.Critical);
        console.log(err);
      }
      );
  }
}
