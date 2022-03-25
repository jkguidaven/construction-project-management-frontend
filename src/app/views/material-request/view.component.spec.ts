import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewMaterialRequestComponent } from './view.component';

describe('ViewMaterialRequestComponent', () => {
  let component: ViewMaterialRequestComponent;
  let fixture: ComponentFixture<ViewMaterialRequestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ViewMaterialRequestComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewMaterialRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
