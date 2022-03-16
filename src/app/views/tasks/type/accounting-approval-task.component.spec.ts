import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountingApprovalTaskComponent } from './accounting-approval-task.component';

describe('AccountingApprovalTaskComponent', () => {
  let component: AccountingApprovalTaskComponent;
  let fixture: ComponentFixture<AccountingApprovalTaskComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AccountingApprovalTaskComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AccountingApprovalTaskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
