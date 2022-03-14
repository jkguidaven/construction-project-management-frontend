import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewProjectScheduleComponent } from './view-project-schedule.component';

describe('ViewProjectScheduleComponent', () => {
  let component: ViewProjectScheduleComponent;
  let fixture: ComponentFixture<ViewProjectScheduleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewProjectScheduleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewProjectScheduleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
