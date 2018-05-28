import { TestBed, inject } from '@angular/core/testing';

import { EdocumentService } from './edocument.service';

describe('EdocumentService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [EdocumentService]
    });
  });

  it('should be created', inject([EdocumentService], (service: EdocumentService) => {
    expect(service).toBeTruthy();
  }));
});
