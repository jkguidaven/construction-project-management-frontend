import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddScopeOfWorkMaterialSubconBudgetComponent } from './add-scope-of-work-material-subcon-budget.component';

describe('AddScopeOfWorkMaterialSubconBudgetComponent', () => {
  let component: AddScopeOfWorkMaterialSubconBudgetComponent;
  let fixture: ComponentFixture<AddScopeOfWorkMaterialSubconBudgetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddScopeOfWorkMaterialSubconBudgetComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddScopeOfWorkMaterialSubconBudgetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
