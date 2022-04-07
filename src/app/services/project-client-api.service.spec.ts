import { TestBed } from '@angular/core/testing';

import { ProjectClientApiService } from './project-client-api.service';

describe('ProjectClientApiService', () => {
  let service: ProjectClientApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProjectClientApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
