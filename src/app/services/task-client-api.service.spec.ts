import { TestBed } from '@angular/core/testing';

import { TaskClientApiService } from './task-client-api.service';

describe('TaskClientApiService', () => {
  let service: TaskClientApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TaskClientApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
