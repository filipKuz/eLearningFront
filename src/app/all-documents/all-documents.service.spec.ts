import { TestBed, inject } from '@angular/core/testing';

import { AllDocumentsService } from './all-documents.service';

describe('AllDocumentsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AllDocumentsService]
    });
  });

  it('should be created', inject([AllDocumentsService], (service: AllDocumentsService) => {
    expect(service).toBeTruthy();
  }));
});
