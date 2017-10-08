import { Component, Input, OnChanges } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { SelectItem } from 'primeng/primeng';
import { AnswerService } from './answer.service';
import { UserService } from '../user/user.service';
import { User } from '../user/user';
import { Answer } from './answer';

@Component({
    selector: 'answer-detail',
    templateUrl: './answer-detail.component.html'
})
export class AnswerDetailComponent implements OnChanges {
    @Input() answer: Answer;
    answerForm: FormGroup;
    nameChangeLog: string[] = [];
    // answerQuestionsList: SelectItem[];
    // selectedAnswerQuestions: string[];
    answerUsersList: SelectItem[];
    selectedAnswerUsers: string[];

    constructor(
        private fb: FormBuilder,
        private as: AnswerService,
        private us: UserService,
        // private qs: QuestionService
    ) {
        // this.getQuestions();
        this.getUsers();
        this.createForm();
        this.logNameChange();
    }

    createForm() {
        this.answerForm = this.fb.group({
            answertext: '',
            author: '',
            active: '',
            creationDate: '',
        });
        this.answerForm.valueChanges.subscribe(data => {

        })
    }

    // getQuestions() {
    //     this.answerQuestionsList = [];
    //     this.qs.getQuestions()
    //         .then(questions => {
    //             questions.map((q) => {
    //                 this.answerQuestionsList.push({ label: q.questiontext, value: q.id });
    //             })
    //         });
    // }

    getUsers() {
        this.answerUsersList = [];
        this.us.getUsers()
            .then(users => {
                users.map((q) => {
                    this.answerUsersList.push({ label: q.name, value: q.id });
                })
            });
    }

    ngOnChanges() {
        this.answerForm.reset({
            answertext: this.answer.answertext,
            // question: this.answer.question,
            author: this.answer.author,
            active: this.answer.active,
            creationDate: this.answer.creationDate,
        });

    }

    onSubmit() {
        this.answer = this.prepareSaveAnswer();

    }

    prepareSaveAnswer(): Answer {
        const formModel = this.answerForm.value;

        const saveAnswer: Answer = {
            id: this.answer.id,
            answertext: formModel.answertext as string,
            // question: formModel.question,
            author: formModel.author,
            active: formModel.active,
            creationDate: formModel.creationDate,
        }
        console.log('save', saveAnswer)
        if (saveAnswer.id !== null) {
            this.as.UpdateAnswer(saveAnswer);
        } else {
            this.as.CreateAnswer(saveAnswer);
        }
        return saveAnswer;
    }

    delete() {
        this.as.DeleteAnswer(this.answer);
    }

    revert() { this.ngOnChanges(); }

    logNameChange() {
        const nameControl = this.answerForm.get('answertext');
        nameControl.valueChanges.forEach(
            (value: string) => this.nameChangeLog.push(value)
        )
    }

}