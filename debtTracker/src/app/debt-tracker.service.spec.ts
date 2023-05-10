import { TestBed } from '@angular/core/testing';

import { DebtTrackerService } from './debt-tracker.service';

describe('DebtTrackerService', () => {
  let service: DebtTrackerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DebtTrackerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
