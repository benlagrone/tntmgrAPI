import { Component, OnInit } from '@angular/core';
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
  constructor(private qs: QuestionService) { }

  ngOnInit() {
    this.getQuestions();
  }

  getQuestions(): void {
    this.qs.getQuestions()
      .then(question => {
        this.list = question
      },
      error => this.errorMessage = <any>error
      );
  }

}
