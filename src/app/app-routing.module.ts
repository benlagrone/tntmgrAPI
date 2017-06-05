import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { QuestionlibraryComponent } from './questionlibrary/questionlibrary.component';
import { CategoryComponent } from './category/category.component';
import { QuestionComponent } from './question/question.component';
import { AssessmentComponent } from './assessment/assessment.component';
import { UserComponent } from './user/user.component';
import { RoleComponent } from './role/role.component';

const routes: Routes = [
  { path: '', redirectTo: '/user', pathMatch: 'full' },
  { path: 'category',  component: CategoryComponent },
  { path: 'question',  component: QuestionComponent },
  { path: 'assessment',  component: AssessmentComponent },
  { path: 'questionlibrary',  component: QuestionlibraryComponent },
  { path: 'role', component: RoleComponent },
  { path: 'user',     component: UserComponent }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
