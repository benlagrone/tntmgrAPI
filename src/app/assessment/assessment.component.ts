import { Component, OnInit, ChangeDetectorRef, AfterViewChecked } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { AssessmentService } from './assessment.service';
import { Assessment } from './assessment';

@Component({
  selector: 'app-assessment',
  templateUrl: './assessment.component.html',
  styleUrls: ['./assessment.component.scss']
})
export class AssessmentComponent implements OnInit {
  list: Assessment[] = [];
  isLoading = false;
  selectedAssessment: Assessment;

  constructor(
    private as: AssessmentService
  ) { }


  ngOnInit() {
    this.getAssessments();
  }
  getAssessments(): void {
    this.isLoading = true;
    this.as.getAssessments()
      .then(assessments => {
        this.list = assessments
        this.isLoading = false;
      })
    this.selectedAssessment = undefined;
  }

  addNew() {
    const noAssessment = {
      id: null,
      name: null,
      description: null,
      // question: null,
      active: null,
      createdAt: null,
      questionlibraries: null,
      questionlist: null
    }
    this.selectedAssessment = noAssessment;
  }

  select(assessment: Assessment) {
    console.log(assessment)
    this.selectedAssessment = assessment
  }

}
