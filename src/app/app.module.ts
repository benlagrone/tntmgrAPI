import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {Http, HttpModule} from '@angular/http';
import {HttpClientModule} from '@angular/common/http';
import {RouterModule} from '@angular/router';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {TranslateModule, TranslateLoader, TranslateStaticLoader} from 'ng2-translate/ng2-translate';
// import {AppRoutingModule} from './app-routing.module';

import {rootRouterConfig} from './app.routes';
import {AppCommonModule} from './components/common/app-common.module';
import {AppComponent} from './app.component';

import {RoutePartsService} from './services/route-parts/route-parts.service';
import {NavigationService} from './services/navigation/navigation.service';
import {AuthGuard} from './services/auth/auth.guard';
import {ReactiveFormsModule} from '@angular/forms';

import {MultiSelectModule} from 'primeng/primeng';
import {DragDropModule, DataTableModule, SharedModule} from 'primeng/primeng';
import {OrderListModule} from 'primeng/primeng';
import {SelectButtonModule} from 'primeng/primeng';
import {TreeModule, TreeNode} from 'primeng/primeng';
import {TreeDragDropService} from 'primeng/primeng';


import {QuestionLibraryComponent} from './questionlibrary/questionlibrary.component';
import {CategoryComponent} from './category/category.component';
import {QuestionComponent} from './question/question.component';
import {QuestionDetailComponent} from './question/question-detail.component';
import {AssessmentComponent} from './assessment/assessment.component';
import {AssessmentDetailComponent} from './assessment/assessment-detail.component';
import {UserComponent} from './user/user.component';
import {UserDetailComponent} from './user/user-detail.component';
import {TypeComponent} from './type/type.component';
import {TypeDetailComponent} from './type/type-detail.component';
import {AnswerComponent} from './answer/answer.component';
import {AnswerDetailComponent} from './answer/answer-detail.component';
import {GroupComponent} from './group/group.component';
import {RoleComponent} from './role/role.component';
import {CategoryDetailComponent} from './category/category-detail.component';
import {RoleDetailComponent} from './role/role-detail.component'; // <-- #1 import component
import {GroupDetailComponent} from './group/group-detail.component'; // <-- #1 import component
import {QuestionLibraryDetailComponent} from './questionlibrary/questionlibrary-detail.component'; // <-- #1 import component

import {UserService} from './user/user.service';
import {RoleService} from './role/role.service';
import {GroupService} from './group/group.service';
import {TypeService} from './type/type.service';
import {AnswerService} from './answer/answer.service';
import {QuestionLibraryService} from './questionlibrary/questionlibrary.service';
import {CategoryService} from './category/category.service';
import {QuestionService} from './question/question.service';
import {AssessmentService} from './assessment/assessment.service';

export function createTranslateLoader(http: Http) {
    return new TranslateStaticLoader(http, './assets/i18n', '.json');
}

@NgModule({
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        FormsModule,
        HttpModule,
        HttpClientModule,
        AppCommonModule,
        // AppRoutingModule, TODO delete and remove import
        ReactiveFormsModule,
        MultiSelectModule,
        SelectButtonModule,
        DragDropModule,
        DataTableModule,
        SharedModule,
        OrderListModule,
        TreeModule,
        TranslateModule.forRoot({ // TODO delete and remove import
            provide: TranslateLoader,
            useFactory: (createTranslateLoader),
            deps: [Http]
        }),
        RouterModule.forRoot(rootRouterConfig, {useHash: false})
    ],
    declarations: [
        AppComponent,
        QuestionLibraryComponent,
        QuestionLibraryDetailComponent,
        CategoryComponent,
        QuestionComponent,
        AssessmentComponent,
        AssessmentDetailComponent,
        UserComponent,
        UserDetailComponent,
        AnswerComponent,
        AnswerDetailComponent,
        RoleComponent,
        RoleDetailComponent,
        GroupComponent,
        GroupDetailComponent,
        CategoryDetailComponent,
        QuestionDetailComponent,
        TypeComponent,
        TypeDetailComponent
    ],
    providers: [
        UserService,
        CategoryService,
        GroupService,
        RoleService,
        QuestionService,
        QuestionLibraryService,
        AssessmentService,
        TypeService,
        AnswerService,
        TreeDragDropService,
        RoutePartsService,
        NavigationService,
        AuthGuard
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
