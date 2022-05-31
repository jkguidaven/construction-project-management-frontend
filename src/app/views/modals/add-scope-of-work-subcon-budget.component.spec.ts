import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddScopeOfWorkSubconBudgetComponent } from './add-scope-of-work-subcon-budget.component';

describe('AddScopeOfWorkSubconBudgetComponent', () => {
  let component: AddScopeOfWorkSubconBudgetComponent;
  let fixture: ComponentFixture<AddScopeOfWorkSubconBudgetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddScopeOfWorkSubconBudgetComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddScopeOfWorkSubconBudgetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
