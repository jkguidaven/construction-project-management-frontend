import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DesignTaskComponent } from './design-task.component';

describe('DesignTaskComponent', () => {
  let component: DesignTaskComponent;
  let fixture: ComponentFixture<DesignTaskComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DesignTaskComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DesignTaskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
