import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectOverviewViewerComponent } from './project-overview-viewer.component';

describe('ProjectOverviewViewerComponent', () => {
  let component: ProjectOverviewViewerComponent;
  let fixture: ComponentFixture<ProjectOverviewViewerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProjectOverviewViewerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectOverviewViewerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
