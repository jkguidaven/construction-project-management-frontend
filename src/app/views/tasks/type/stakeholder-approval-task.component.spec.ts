import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StakeholderApprovalTaskComponent } from './stakeholder-approval-task.component';

describe('StakeholderApprovalTaskComponent', () => {
  let component: StakeholderApprovalTaskComponent;
  let fixture: ComponentFixture<StakeholderApprovalTaskComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StakeholderApprovalTaskComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StakeholderApprovalTaskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
