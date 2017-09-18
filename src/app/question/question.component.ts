import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { QuestionService } from './question.service';
import { Question } from './question';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.css']
})
export class QuestionComponent implements OnInit {

  list: Question[] = [];
  private title = "questions";
  private errorMessage: any = '';
  isLoading = false;
  selectedQuestion: Question;

  constructor(
    private qs: QuestionService
  ) { }

  ngOnInit() {
    this.getQuestions();
  }
  getQuestions(): void {
    this.isLoading = true;
    this.qs.getQuestions()
      .then(questions => {
        this.list = questions
        this.isLoading = false;
      })
    this.selectedQuestion = undefined;
  }

  addNewQuestion() {
    const noQuestion = {
      id: null,
      description: null,
      questiontext: null,
      group: null,
      user: null,
      weight: null,
      answer: null,
      answers: null,
      active: null,
      creationDate: null,
      type: [],
      category: null
      // answer1: null,
      // answer2: null,
      // answer3: null,
      // answer4: null,
    }
    this.selectedQuestion = noQuestion;
  }

  selectQuestion(question: Question) {
    console.log('select')
    console.log(question)
    this.selectedQuestion = question
  }



}
