import { TestBed } from '@angular/core/testing';

import { AttachmentClientApiService } from './attachment-client-api.service';

describe('AttachmentClientApiService', () => {
  let service: AttachmentClientApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AttachmentClientApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
