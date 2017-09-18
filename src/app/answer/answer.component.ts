import { Component, OnInit, ChangeDetectorRef, AfterViewChecked } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { AnswerService } from './answer.service';
import { Answer } from './answer';

@Component({
  selector: 'app-answer',
  templateUrl: './answer.component.html',
  styleUrls: ['./answer.component.scss']
})
export class AnswerComponent implements OnInit {
  list: Answer[] = [];
  isLoading = false;
  selectedAnswer: Answer;

  constructor(
    private as: AnswerService
  ) { }


  ngOnInit() {
    this.getAnswers();
  }
  getAnswers(): void {
    this.isLoading = true;
    this.as.getAnswers()
      .then(answers => {
        this.list = answers
        this.isLoading = false;
      })
    this.selectedAnswer = undefined;
  }

  addNew() {
    const noAnswer = {
      id: null,
      answertext: null,
      question: null,
      author: null,
      active: null,
      creationDate: null
    }
    this.selectedAnswer = noAnswer;
  }

  select(answer: Answer) {
    console.log(answer)
    this.selectedAnswer = answer
  }

}
