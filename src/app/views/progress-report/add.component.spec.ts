import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddProgressReportComponent } from './add.component';

describe('AddProgressReportComponent', () => {
  let component: AddProgressReportComponent;
  let fixture: ComponentFixture<AddProgressReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddProgressReportComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddProgressReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
