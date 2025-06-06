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
  private title = "QuestionLibraries";
  isLoading = false;
  selectedQuestionLibrary: QuestionLibrary;
  private errorMessage: any = '';

  constructor(private qs: QuestionLibraryService) { }

  ngOnInit() {
    this.getQuestionLibraries();
  }

  getQuestionLibraries(): void {
    this.qs.getQuestionLibraries()
      .then(questionlibrary => {
        this.list = questionlibrary;
        this.isLoading = false;
      },
      error => this.errorMessage = <any>error
      );
    this.selectedQuestionLibrary = undefined;
  }

  addNewQuestionLibrary() {
    const noQuestionLibrary = {
      "id": null,
      "name": null,
      "description": null,
      "active": null
    }
    this.selectedQuestionLibrary = noQuestionLibrary;
  }
  select(questionlibrary: QuestionLibrary) {
    this.selectedQuestionLibrary = questionlibrary;
  }
}
