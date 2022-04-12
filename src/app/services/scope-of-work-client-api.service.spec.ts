import { TestBed } from '@angular/core/testing';

import { ScopeOfWorkClientApiService } from './scope-of-work-client-api.service';

describe('ScopeOfWorkClientApiService', () => {
  let service: ScopeOfWorkClientApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ScopeOfWorkClientApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
