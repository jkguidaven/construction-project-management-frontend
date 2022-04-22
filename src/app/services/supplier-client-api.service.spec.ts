import { TestBed } from '@angular/core/testing';

import { SupplierClientApiService } from './supplier-client-api.service';

describe('SupplierClientApiService', () => {
  let service: SupplierClientApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SupplierClientApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
