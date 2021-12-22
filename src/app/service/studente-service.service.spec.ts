import { TestBed } from '@angular/core/testing';

import { StudenteServiceService } from './studente-service.service';

describe('StudenteServiceService', () => {
  let service: StudenteServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StudenteServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
