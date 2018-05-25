import { TestBed, inject } from '@angular/core/testing';

import { JwtInterceptorService } from './jwt-interceptor.service';

describe('JwtInterceptorService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [JwtInterceptorService]
    });
  });

  it('should be created', inject([JwtInterceptorService], (service: JwtInterceptorService) => {
    expect(service).toBeTruthy();
  }));
});
