import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddScopeOfWorkTaskSubconBudgetComponent } from './add-scope-of-work-task-subcon-budget.component';

describe('AddScopeOfWorkTaskSubconBudgetComponent', () => {
  let component: AddScopeOfWorkTaskSubconBudgetComponent;
  let fixture: ComponentFixture<AddScopeOfWorkTaskSubconBudgetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddScopeOfWorkTaskSubconBudgetComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddScopeOfWorkTaskSubconBudgetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
