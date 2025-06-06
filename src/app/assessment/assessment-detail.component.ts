import {AfterViewInit, Component, Input, OnChanges} from '@angular/core';
import {FormArray, FormBuilder, FormGroup} from '@angular/forms';
import {SelectItem, DragDropModule, DataTableModule, SharedModule} from 'primeng/primeng';
import {OrderListModule} from 'primeng/primeng';
import {TreeModule, TreeNode} from 'primeng/primeng';
import {TreeDragDropService} from 'primeng/primeng';
import {AssessmentService} from './assessment.service';
import {QuestionLibraryService} from '../questionlibrary/questionlibrary.service';
import {QuestionLibrary} from '../questionlibrary/questionlibrary';
import {QuestionService} from '../question/question.service';
import {Question} from '../question/question';
import {UserService} from '../user/user.service';
import {User} from '../user/user';
import {Assessment} from './assessment';
import {Answer} from '../answer/answer';
import {AnswerService} from '../answer/answer.service';

@Component({
    selector: 'assessment-detail',
    templateUrl: './assessment-detail.component.html',
    styleUrls: ['./assessment-detail.component.scss']
})
export class AssessmentDetailComponent implements OnChanges, AfterViewInit {
    @Input() assessment: Assessment;
    assessmentForm: FormGroup;
    nameChangeLog: string[] = [];
    selectedQuestionLibrariesList: any[];
    // selectedAssessmentQuestions: string[];
    assessmentQuestionLibrariesList: any[];
    selectedAssessmentUsers: string[];
    availableQuestions: Question[];
    selectedQuestions: Question[];
    draggedQuestion: Question;
    files: TreeNode[];
    files1: TreeNode[];

    // files3: TreeNode[];

    constructor(private fb: FormBuilder,
                private ass: AssessmentService,
                private us: UserService,
                private qls: QuestionLibraryService,
                private qs: QuestionService,
                private as: AnswerService) {
        this.getQuestionLibraries();
        // this.getUsers();
        this.createForm();
        this.logNameChange();
    }

    ngAfterViewInit() {
        this.selectedQuestions = [];
        const questionLibraryListControl = this.assessmentForm.get('questionlibraries');
        questionLibraryListControl.valueChanges.subscribe(data => {
            console.log('data', data);
            this.selectedQuestionLibrariesList = data;
            this.getSelectedQuestions(data);
        });
    }

    getQuestionLibraries() {
        let questionTree = {
            data: []
        };
        this.assessmentQuestionLibrariesList = [];
        this.qls.getQuestionLibraries()
            .then(questions => {
                questions.map((q) => {
                    // console.log('q', q);
                    this.assessmentQuestionLibrariesList.push({
                        label: q.name,
                        // value: q.id,
                        id: q.id,
                        expandedIcon: "fa-folder-open",
                        collapsedIcon: "fa-folder",
                        children: this.getSelectedQuestions(q.id)
                    });
                })
                console.log('this', this);
                this.files = this.assessmentQuestionLibrariesList;

            });
    }

    getSelectedQuestions(data) {
        // console.log('foo',data)
        let children = []
        this.qs.getQuestionLibraries([data])
            .then((questions) => {
                // console.log('questions', questions)
                let qtemp = Object.assign(questions)
                qtemp.map((q) => {

                    q.label = q.questiontext;
                    q.icon = 'fa-question-circle';
                    q.data = q.description;
                    q.children = this.getAnswers(q.id)
                    children.push(q)
                })
                // this.availableQuestions = questions;
                // this.selectedQuestions = this.availableQuestions
                // const questionIds = this.selectedQuestions.map((q) => q.id);
                // this.getAnswers(questionIds);

            })
        return children;
    }


    getAnswers(questionIds) {
        let answerArray = []
        this.as.getAnswersByQuestion([questionIds])
            .then((a) => {
                console.log('answers a', a)
                let answerSet = Object.assign(a)
                console.log('answerSet', answerSet.answersPerQuestion)
                answerSet.answersPerQuestion.map((b) => {
                    b.label = b.answerText;
                    b.data = b.answerId;
                    b.expandedIcon = '';
                    b.collapsedIcon = '';
                    b.icon = b.correct === true ? 'fa-check-circle-o' : 'fa-circle-o';
                    answerArray.push(b);
                })

            });
        return answerArray;
    }


    createForm() {
        this.assessmentForm = this.fb.group({
            name: '',
            description: '',
            active: '',
            createdAt: '',
            questionlibraries: '',
            questionlist: ''
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
        console.log('this', this)

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

    revert() {
        this.ngOnChanges();
    }

    logNameChange() {
        const nameControl = this.assessmentForm.get('name');
        nameControl.valueChanges.forEach(
            (value: string) => this.nameChangeLog.push(value)
        )
    }

}