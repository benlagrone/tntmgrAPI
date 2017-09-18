import { Component, Input, OnChanges } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { SelectItem } from 'primeng/primeng';
import { SelectButton } from 'primeng/primeng';
import { QuestionService } from './question.service';
import { Question } from './question';
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
export class QuestionDetailComponent implements OnChanges {
    @Input() question: Question;
    questionForm: FormGroup;
    nameChangeLog: string[] = [];


    questionAnswerList: SelectItem[];
    selectedQuestionAnswers: string[];
    questionUsersList: SelectItem[];
    selectedQuestionUsers: string[];
    questionCategoryList: SelectItem[];

    questionTypesList: SelectItem[];

    selectedAnswersList: SelectItem[];
    correctAnswers: string[];

    constructor(
        private fb: FormBuilder,
        private qs: QuestionService,
        private as: AnswerService,
        private cs: CategoryService,
        private us: UserService,
        private ts: TypeService,
    ) {
        this.createForm();
        this.logNameChange();
        this.getUsers();
        this.getTypes();
        this.getCategories();
        // this.getAnswersList();
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
            category: ''
            // answer1: '',
            // answer2: '',
            // answer3: '',
            // answer4: '',
        });
        this.questionForm.valueChanges.subscribe(data => {
            // this.selectedAnswersList = this.questionAnswerList.filter((item) => data.answers.indexOf(item.value) != -1);
        })
    }

    getCategories() {
        this.questionCategoryList = [];
        this.cs.getCategories()
            .then(categories => {
                console.log(categories)
                categories.map((q) => {
                    this.questionCategoryList.push({ label: q.name, value: q.id });
                })
            });
    }

    getUsers() {
        this.questionUsersList = [];
        this.us.getUsers()
            .then(users => {
                users.map((q) => {
                    this.questionUsersList.push({ label: q.name, value: q.id });
                })
            });
    }

    getTypes() {
        this.questionTypesList = [];
        this.ts.getTypes()
            .then(types => {
                types.map((q) => {
                    this.questionTypesList.push({ label: q.name, value: q.id });
                })
            });
    }

    getAnswersList() {
        this.questionAnswerList = [];
        this.as.getAnswers()
            .then(answers => {
                answers.map((q) => {
                    this.questionAnswerList.push({ label: q.answertext, value: q.id });
                })
            });
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
            category: this.question.category
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
            category: formModel.category
        }
        console.log('save', saveQuestion)
        if (saveQuestion.id !== null) {
            this.qs.UpdateQuestion(saveQuestion);
        } else {
            this.qs.CreateQuestion(saveQuestion);
        }
        return saveQuestion;
    }

    delete() {
        this.qs.DeleteQuestion(this.question);
    }

    revert() { this.ngOnChanges(); }

    logNameChange() {
        const nameControl = this.questionForm.get('questiontext');
        nameControl.valueChanges.forEach(
            (value: string) => this.nameChangeLog.push(value)
        )
    }

}