import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScheduleProjectTaskComponent } from './schedule-project-task.component';

describe('ScheduleProjectTaskComponent', () => {
  let component: ScheduleProjectTaskComponent;
  let fixture: ComponentFixture<ScheduleProjectTaskComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ScheduleProjectTaskComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ScheduleProjectTaskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
