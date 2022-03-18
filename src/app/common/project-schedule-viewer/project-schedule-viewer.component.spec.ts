import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectScheduleViewerComponent } from './project-schedule-viewer.component';

describe('ProjectScheduleViewerComponent', () => {
  let component: ProjectScheduleViewerComponent;
  let fixture: ComponentFixture<ProjectScheduleViewerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProjectScheduleViewerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectScheduleViewerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
