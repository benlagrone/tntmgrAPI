import { Component, OnInit } from '@angular/core';
import { QuestionlibraryService } from './questionlibrary.service';
import { QuestionLibrary } from './questionlibrary';

@Component({
  selector: 'app-questionlibrary',
  templateUrl: './questionlibrary.component.html',
  styleUrls: ['./questionlibrary.component.css']
})
export class QuestionlibraryComponent implements OnInit {

  list: QuestionLibrary[] = [];
  private title = "Question Libraries";
  private errorMessage: any = '';
  constructor(private qls: QuestionlibraryService) { }

  ngOnInit() {
    this.getQuestionLibraries();
  }

  getQuestionLibraries(): void {
    this.qls.getQuestionLibraries()
      .then(questionlibrary => {
        this.list = questionlibrary;
      },
      error => this.errorMessage = <any>error
      );
  }

}
