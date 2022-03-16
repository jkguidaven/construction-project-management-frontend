import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CostEstimateTaskComponent } from './cost-estimate-task.component';

describe('CostEstimateTaskComponent', () => {
  let component: CostEstimateTaskComponent;
  let fixture: ComponentFixture<CostEstimateTaskComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CostEstimateTaskComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CostEstimateTaskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
