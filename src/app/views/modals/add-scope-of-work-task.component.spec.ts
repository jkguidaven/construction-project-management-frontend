import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddScopeOfWorkTaskComponent } from './add-scope-of-work-task.component';

describe('AddScopeOfWorkTaskComponent', () => {
  let component: AddScopeOfWorkTaskComponent;
  let fixture: ComponentFixture<AddScopeOfWorkTaskComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddScopeOfWorkTaskComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddScopeOfWorkTaskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
