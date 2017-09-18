import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { QuestionlibraryComponent } from './questionlibrary/questionlibrary.component';
import { CategoryComponent } from './category/category.component';
import { QuestionComponent } from './question/question.component';
import { AssessmentComponent } from './assessment/assessment.component';
import { AnswerComponent } from './answer/answer.component';
import { UserComponent } from './user/user.component';
import { RoleComponent } from './role/role.component';
import { GroupComponent } from './group/group.component';
import { TypeComponent } from './type/type.component';

const routes: Routes = [
  { path: '', redirectTo: '/', pathMatch: 'full' },
  { path: 'category',  component: CategoryComponent },
  { path: 'question',  component: QuestionComponent },
  { path: 'assessment',  component: AssessmentComponent },
  { path: 'questionlibrary',  component: QuestionlibraryComponent },
  { path: 'answer', component: AnswerComponent },
  { path: 'role', component: RoleComponent },
  { path: 'group', component: GroupComponent },
  { path: 'user', component: UserComponent },
  { path: 'type', component: TypeComponent }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
