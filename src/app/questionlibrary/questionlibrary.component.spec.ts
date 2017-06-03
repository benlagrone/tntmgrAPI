import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuestionlibraryComponent } from './questionlibrary.component';

describe('QuestionlibraryComponent', () => {
  let component: QuestionlibraryComponent;
  let fixture: ComponentFixture<QuestionlibraryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuestionlibraryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuestionlibraryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
