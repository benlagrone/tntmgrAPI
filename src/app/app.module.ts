import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { QuestionlibraryComponent } from './questionlibrary/questionlibrary.component';
import { CategoryComponent } from './category/category.component';
import { QuestionComponent } from './question/question.component';
import { AssessmentComponent } from './assessment/assessment.component';
import { UserComponent } from './user/user.component';
import { RoleComponent } from './role/role.component';

import { UserService } from './user/user.service';
import { RoleService } from './role/role.service';
import { QuestionlibraryService } from './questionlibrary/questionlibrary.service';
import { CategoryService } from './category/category.service';
import { QuestionService } from './question/question.service';
import { AssessmentService } from './assessment/assessment.service';



@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AppRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [
    AppComponent,
    QuestionlibraryComponent,
    CategoryComponent,
    QuestionComponent,
    AssessmentComponent,
    UserComponent,
    RoleComponent,
  ],
  providers: [
    UserService,
    CategoryService,
    RoleService,
    QuestionService,
    QuestionlibraryService,
    AssessmentService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
