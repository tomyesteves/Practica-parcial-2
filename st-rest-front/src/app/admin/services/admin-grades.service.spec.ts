import { TestBed } from '@angular/core/testing';

import { AdminGradesService } from './admin-grades.service';

describe('AdminGradesService', () => {
  let service: AdminGradesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AdminGradesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
