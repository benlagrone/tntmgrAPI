import { TestBed, inject } from '@angular/core/testing';

import { QuestionlibraryService } from './questionlibrary.service';

describe('QuestionlibraryService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [QuestionlibraryService]
    });
  });

  it('should ...', inject([QuestionlibraryService], (service: QuestionlibraryService) => {
    expect(service).toBeTruthy();
  }));
});
