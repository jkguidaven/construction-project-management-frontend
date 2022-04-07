import { TestBed } from '@angular/core/testing';

import { CustomerClientApiService } from './customer-client-api.service';

describe('CustomerClientApiService', () => {
  let service: CustomerClientApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CustomerClientApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
