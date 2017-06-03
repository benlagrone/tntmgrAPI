import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule }   from '@angular/router';

import { AppComponent } from './app.component';
import { QuestionlibraryComponent } from './questionlibrary/questionlibrary.component';
import { CategoryComponent } from './category/category.component';
import { QuestionComponent } from './question/question.component';
import { AssessmentComponent } from './assessment/assessment.component';
import { UserComponent } from './user/user.component';
import { RoleComponent } from './role/role.component';



@NgModule({
  declarations: [
    AppComponent,
    QuestionlibraryComponent,
    CategoryComponent,
    QuestionComponent,
    AssessmentComponent,
    UserComponent,
    RoleComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot([
  {
    path: 'user',
    component: UserComponent
  }
])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
