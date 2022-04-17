import { TestBed } from '@angular/core/testing';

import { MaterialRequestClientApiService } from './material-request-client-api.service';

describe('MaterialRequestClientApiService', () => {
  let service: MaterialRequestClientApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MaterialRequestClientApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
