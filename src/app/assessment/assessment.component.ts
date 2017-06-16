import { Component, OnInit } from '@angular/core';
import { AssessmentService } from './assessment.service';
import { Assessment } from './assessment';

@Component({
  selector: 'app-assessment',
  templateUrl: './assessment.component.html',
  styleUrls: ['./assessment.component.css']
})
export class AssessmentComponent implements OnInit {

  assessment: Assessment[] = [];
  private title = "Assessments";
  private errorMessage: any = '';
  constructor(private as: AssessmentService) { }

  ngOnInit() {
    this.getAssessments();
  }
  
  getAssessments(): void {
    this.as.getAssessments()
      .then(assessment => {
        this.assessment = assessment
      },
      error => this.errorMessage = <any>error
      );
  }

}
