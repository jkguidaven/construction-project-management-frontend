import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApproveProgressReportComponent } from './approve-progress-report.component';

describe('ApproveProgressReportComponent', () => {
  let component: ApproveProgressReportComponent;
  let fixture: ComponentFixture<ApproveProgressReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ApproveProgressReportComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ApproveProgressReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
