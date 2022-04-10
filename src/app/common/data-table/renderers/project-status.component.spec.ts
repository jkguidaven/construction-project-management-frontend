import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectStatusDataTableRendererComponent } from './project-status.component';

describe('ProjectStatusDataTableRendererComponent', () => {
  let component: ProjectStatusDataTableRendererComponent;
  let fixture: ComponentFixture<ProjectStatusDataTableRendererComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProjectStatusDataTableRendererComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectStatusDataTableRendererComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
