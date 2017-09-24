import { Component, Input, OnChanges, NgModule, AfterViewInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { SelectItem } from 'primeng/primeng';
import { SelectButton } from 'primeng/primeng';
import { QuestionService } from './question.service';
import { Question } from './question';
import { QuestionLibraryService } from '../questionlibrary/questionlibrary.service';
import { QuestionLibrary } from '../questionlibrary/questionlibrary';
import { User } from '../user/user';
import { UserService } from '../user/user.service';
import { AnswerService } from '../answer/answer.service';
import { TypeService } from '../type/type.service';
import { CategoryService } from '../category/category.service';
import { Answer } from '../answer/answer';

@Component({
    selector: 'question-detail',
    templateUrl: './question-detail.component.html'
})
export class QuestionDetailComponent implements OnChanges, AfterViewInit {
    @Input() question: Question;
    questionForm: FormGroup;
    nameChangeLog: string[] = [];

    questionAnswerList: SelectItem[];
    selectedQuestionAnswers: string[];
    questionUsersList: SelectItem[];
    selectedQuestionUsers: string[];
    questionCategoryList: SelectItem[];
    questionQuestionLibraryList: SelectItem[];
    questionTypesList: SelectItem[];

    newQuestion: string;
    selectedAnswersList: SelectItem[];
    correctAnswersList: any[];
    selectedCorrectAnswers: string[];

    constructor(
        private fb: FormBuilder,
        private qs: QuestionService,
        private qls: QuestionLibraryService,
        private as: AnswerService,
        private cs: CategoryService,
        private us: UserService,
        private ts: TypeService,
    ) {
        this.createForm();
        this.logNameChange();
        this.getUsers();
        this.getTypes();
        this.getQuestionLibraries();
        this.getCategories();
        this.getAnswersList();
        this.changeCorrectAnswerList();
    }

    ngAfterViewInit() {
        const answerListControl = this.questionForm.get('answers');
        console.log('changes', answerListControl);
        answerListControl.valueChanges.subscribe(data => {
            console.log('list', data)
            this.selectedAnswersList = data;
            this.getAnswers();
        })
    }

    createForm() {
        this.questionForm = this.fb.group({
            description: '',
            questiontext: '',
            group: '',
            user: '',
            weight: '',
            answer: '',
            active: '',
            creationDate: '',
            type: '',
            answers: '',
            category: '',
            questionlibrary: '',
        });



        this.questionForm.valueChanges.subscribe(data => {
            console.log('this', this);
            console.log('data', data);
            // const answerListControl = this.questionForm.get('answers');
            // console.log('changes', answerListControl);
            // console.log('this.questionForm.value', this.questionForm.value.answers);
            // this.selectedAnswersList = this.questionAnswerList.filter((item) => data.answers.indexOf(item.value) != -1);
            // console.log('this.selectedAnswersList',  this.selectedAnswersList);
        })
    }

    getCategories() {
        return this.cs.getCategories()
            .then(categories => {
                this.questionCategoryList = [];
                categories.map((q) => {
                    this.questionCategoryList.push({ label: q.name, value: q.id });
                })
            });
    }

    getQuestionLibraries() {
        return this.qls.getQuestionLibraries()
            .then(questionlibraries => {
                this.questionQuestionLibraryList = [];
                questionlibraries.map((q) => {
                    this.questionQuestionLibraryList.push({ label: q.name, value: q.id });
                })
            });
    }

    getUsers() {
        return this.us.getUsers()
            .then(users => {
                this.questionUsersList = [];
                users.map((q) => {
                    this.questionUsersList.push({ label: q.name, value: q.id });
                })
            });
    }

    getTypes() {
        return this.ts.getTypes()
            .then(types => {
                this.questionTypesList = [];
                types.map((q) => {
                    this.questionTypesList.push({ label: q.name, value: q.id });
                })
            });
    }

    getAnswersList() {
        return this.as.getAnswers()
            .then(answers => {
                this.questionAnswerList = [];
                answers.map((q) => {
                    this.questionAnswerList.push({ label: q.answertext, value: q.id });
                })
            })
            .then(() => this.getAnswers())
    }

    getAnswers() {
        this.correctAnswersList = [];
        if (this.selectedAnswersList) {
            this.questionAnswerList.forEach((q) => {
                if (this.selectedAnswersList.indexOf(q.value) !== -1) {
                    console.log('q', q)
                    var foo = { label: q.label, value: q.value }
                    this.correctAnswersList.push({ label: q.label, value: q.value })
                }
            });
        }
    }

    ngOnChanges() {
        this.questionForm.reset({
            description: this.question.description,
            questiontext: this.question.questiontext,
            // group: this.question.group,
            user: this.question.user,
            weight: this.question.weight,
            answer: this.question.answer,
            active: this.question.active,
            creationDate: this.question.creationDate,
            type: this.question.type,
            answers: this.question.answers,
            category: this.question.category,
            questionlibrary: this.question.questionlibrary,
        });

    }

    onSubmit() {
        console.log("button")
        this.question = this.prepareSaveQuestion();

    }

    prepareSaveQuestion(): Question {
        const formModel = this.questionForm.value;

        const saveQuestion: Question = {
            id: this.question.id,
            description: formModel.description,
            questiontext: formModel.questiontext,
            group: formModel.group,
            user: formModel.user,
            weight: formModel.weight,
            answer: formModel.answer,
            active: formModel.active,
            creationDate: formModel.creationDate,
            type: formModel.type,
            answers: formModel.answers,
            category: formModel.category,
            questionlibrary: formModel.questionlibrary
        }
        console.log('save', saveQuestion)
        if (saveQuestion.id !== null) {
            this.qs.UpdateQuestion(saveQuestion);
        } else {
            this.qs.CreateQuestion(saveQuestion);
        }
        return saveQuestion;
    }

    addAnswer(v) {
        var newAnswer = {
            id: null,
            answertext: v.srcElement.previousElementSibling.value,
            author: '',
            active: true,
            creationDate: '',
        }
        this.as.CreateAnswer(newAnswer)
            .then(() => {
                this.getAnswersList();
                v.srcElement.previousElementSibling.value = '';
            });
    }

    delete() {
        this.qs.DeleteQuestion(this.question);
    }

    revert() { this.ngOnChanges(); }

    changeCorrectAnswerList() {
        // const answerListControl = this.questionForm.get('answers');
        // console.log('changes', answerListControl.valueChanges);
    }

    logNameChange() {
        const nameControl = this.questionForm.get('questiontext');
        nameControl.valueChanges.forEach(
            (value: string) => this.nameChangeLog.push(value)
        )
    }

}