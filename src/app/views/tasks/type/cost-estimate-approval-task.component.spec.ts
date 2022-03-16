import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CostEstimateApprovalTaskComponent } from './cost-estimate-approval-task.component';

describe('CostEstimateApprovalTaskComponent', () => {
  let component: CostEstimateApprovalTaskComponent;
  let fixture: ComponentFixture<CostEstimateApprovalTaskComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CostEstimateApprovalTaskComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CostEstimateApprovalTaskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
