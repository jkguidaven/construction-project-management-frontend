import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectCostSummaryViewerComponent } from './project-cost-summary-viewer.component';

describe('ProjectCostSummaryViewerComponent', () => {
  let component: ProjectCostSummaryViewerComponent;
  let fixture: ComponentFixture<ProjectCostSummaryViewerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProjectCostSummaryViewerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectCostSummaryViewerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
