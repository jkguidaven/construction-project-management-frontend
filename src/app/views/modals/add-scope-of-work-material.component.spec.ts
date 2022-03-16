import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddScopeOfWorkMaterialComponent } from './add-scope-of-work-material.component';

describe('AddScopeOfWorkMaterialComponent', () => {
  let component: AddScopeOfWorkMaterialComponent;
  let fixture: ComponentFixture<AddScopeOfWorkMaterialComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddScopeOfWorkMaterialComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddScopeOfWorkMaterialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
