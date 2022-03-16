import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProcurementTaskComponent } from './procurement-task.component';

describe('ProcurementTaskComponent', () => {
  let component: ProcurementTaskComponent;
  let fixture: ComponentFixture<ProcurementTaskComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProcurementTaskComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProcurementTaskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
