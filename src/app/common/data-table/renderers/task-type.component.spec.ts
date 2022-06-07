import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskTypeDataTableRendererComponent } from './task-type.component';

describe('TaskTypeComponent', () => {
  let component: TaskTypeDataTableRendererComponent;
  let fixture: ComponentFixture<TaskTypeDataTableRendererComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TaskTypeDataTableRendererComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TaskTypeDataTableRendererComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
