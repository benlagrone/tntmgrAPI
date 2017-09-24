import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuestionLibraryComponent } from './questionlibrary.component';

describe('QuestionLibraryComponent', () => {
  let component: QuestionLibraryComponent;
  let fixture: ComponentFixture<QuestionLibraryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuestionLibraryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuestionLibraryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
