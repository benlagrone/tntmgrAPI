import { Component, Input, OnChanges } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { SelectItem, DragDropModule, DataTableModule, SharedModule} from 'primeng/primeng';
import { OrderListModule } from 'primeng/primeng';
import { AssessmentService } from './assessment.service';
import { QuestionLibraryService } from '../questionlibrary/questionlibrary.service';
import { QuestionLibrary } from '../questionlibrary/questionlibrary';
import { QuestionService } from '../question/question.service';
import { Question } from '../question/question';
import { UserService } from '../user/user.service';
import { User } from '../user/user';
import { Assessment } from './assessment';
import { Answer } from '../answer/answer';
import { AnswerService } from '../answer/answer.service';

@Component({
    selector: 'assessment-detail',
    templateUrl: './assessment-detail.component.html',
    styleUrls: ['./assessment-detail.component.scss']
})
export class AssessmentDetailComponent implements OnChanges {
    @Input() assessment: Assessment;
    assessmentForm: FormGroup;
    nameChangeLog: string[] = [];
    selectedQuestionLibrariesList: SelectItem[];
    // selectedAssessmentQuestions: string[];
    assessmentQuestionLibrariesList: SelectItem[];
    selectedAssessmentUsers: string[];
    availableQuestions: Question[];
    selectedQuestions: Question[];
    draggedQuestion: Question;

    constructor(
        private fb: FormBuilder,
        private ass: AssessmentService,
        private us: UserService,
        private qls: QuestionLibraryService,
        private qs: QuestionService,
        private as: AnswerService

    ) {
        this.getQuestionLibraries();
        // this.getUsers();
        this.createForm();
        this.logNameChange();
    }

    ngAfterViewInit(){
        this.selectedQuestions = [];
        const questionLibraryListControl = this.assessmentForm.get('questionlibraries');
        questionLibraryListControl.valueChanges.subscribe(data => {
            console.log('data', data);
            this.selectedQuestionLibrariesList = data;
            this.getSelectedQuestions(data);
        })
    }

    getQuestionLibraries() {
        this.assessmentQuestionLibrariesList = [];
        this.qls.getQuestionLibraries()
            .then(users => {
                users.map((q) => {
                    this.assessmentQuestionLibrariesList.push({ label: q.name, value: q.id });
                })
            });
    }

    getSelectedQuestions(data) {
        this.qs.getQuestionLibraries(data)
        .then((questions)=>{
            console.log(questions)
            this.availableQuestions = questions;
        })
    }

    dragStart(event,question: Question) {
        this.draggedQuestion = question;
    }
    
    drop(event) {
        if(this.draggedQuestion) {
            let draggedQuestionIndex = this.findIndex(this.draggedQuestion);
            this.selectedQuestions = [...this.selectedQuestions, this.draggedQuestion];
            this.availableQuestions = this.availableQuestions.filter((val,i) => i!=draggedQuestionIndex);
            this.draggedQuestion = null;
            const questionIds = this.selectedQuestions.map((q)=>q.id);
            this.getAnswers(questionIds)
        }
    }

    getAnswers(questionIds){
        this.as.getAnswersByQuestions(questionIds)
        .then((a)=>{
            this.selectedQuestions = this.selectedQuestions.map((q)=>{
                let answers = Object.assign(a)
                q.answers = answers.filter((aw)=>aw.questionId===q.id)[0].answersPerQuestion;
                return q;
            })
            console.log('a', a);
            console.log('this', this);
        })
    }

    findIndex(question: Question) {
        let index = -1;
        for(let i = 0; i < this.availableQuestions.length; i++) {
            if(question.questiontext === this.availableQuestions[i].questiontext) {
                index = i;
                break;
            }
        }
        return index;
    }

    dragEnd(event) {
        this.draggedQuestion = null;
    }


    createForm() {
        this.assessmentForm = this.fb.group({
            name: '',
            description: '',
            active: '',
            createdAt: '',
            questionlibraries:'',
            questionlist:''
        });
        this.assessmentForm.valueChanges.subscribe(data => {

        })
    }

    ngOnChanges() {
        this.assessmentForm.reset({
            name: this.assessment.name,
            description: this.assessment.description,
            active: this.assessment.active,
            createdAt: this.assessment.createdAt,
            questionlibraries: this.assessment.questionlibraries,
            questionlist: this.assessment.questionlist
        });

    }

    onSubmit() {
        this.assessment = this.prepareSaveAssessment();
    }

    prepareSaveAssessment(): Assessment {
        const formModel = this.assessmentForm.value;

        const saveAssessment: Assessment = {
            id: this.assessment.id,
            name: formModel.name as string,
            description: formModel.description,
            active: formModel.active,
            createdAt: formModel.createdAt,
            questionlibraries: formModel.questionlibraries,
            questionlist: formModel.questionlist
        }
        console.log('save', saveAssessment)
        if (saveAssessment.id !== null) {
            this.ass.UpdateAssessment(saveAssessment);
        } else {
            this.ass.CreateAssessment(saveAssessment);
        }
        return saveAssessment;
    }

    delete() {
        this.ass.DeleteAssessment(this.assessment);
    }

    revert() { this.ngOnChanges(); }

    logNameChange() {
        const nameControl = this.assessmentForm.get('name');
        nameControl.valueChanges.forEach(
            (value: string) => this.nameChangeLog.push(value)
        )
    }

}