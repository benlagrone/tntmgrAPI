import { TestBed, inject } from '@angular/core/testing';

import { QuestionLibraryService } from './questionlibrary.service';

describe('QuestionLibraryService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [QuestionLibraryService]
    });
  });

  it('should ...', inject([QuestionLibraryService], (service: QuestionLibraryService) => {
    expect(service).toBeTruthy();
  }));
});
