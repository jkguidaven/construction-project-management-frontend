import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadFileDropboxComponent } from './upload-file-dropbox.component';

describe('UploadFileDropboxComponent', () => {
  let component: UploadFileDropboxComponent;
  let fixture: ComponentFixture<UploadFileDropboxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UploadFileDropboxComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UploadFileDropboxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
