import { Component, OnInit } from '@angular/core';
import { QuestionLibraryService } from './questionlibrary.service';
import { QuestionLibrary } from './questionlibrary';

@Component({
  selector: 'app-questionlibrary',
  templateUrl: './questionlibrary.component.html',
  styleUrls: ['./questionlibrary.component.css']
})
export class QuestionLibraryComponent implements OnInit {

  list: QuestionLibrary[] = [];
  private title = "Question Libraries";
  private errorMessage: any = '';
  constructor(private qls: QuestionLibraryService) { }

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
