import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApproveMaterialRequestComponent } from './approve-material-request.component';

describe('ApproveMaterialRequestComponent', () => {
  let component: ApproveMaterialRequestComponent;
  let fixture: ComponentFixture<ApproveMaterialRequestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ApproveMaterialRequestComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ApproveMaterialRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
