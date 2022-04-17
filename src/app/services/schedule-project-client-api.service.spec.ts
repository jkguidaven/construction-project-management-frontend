import { TestBed } from '@angular/core/testing';

import { ScheduleProjectClientApiService } from './schedule-project-client-api.service';

describe('ScheduleProjectClientApiService', () => {
  let service: ScheduleProjectClientApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ScheduleProjectClientApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
