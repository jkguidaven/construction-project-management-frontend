import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FinalApproveMaterialRequestComponent } from './final-approve-material-request.component';

describe('FinalApproveMaterialRequestComponent', () => {
  let component: FinalApproveMaterialRequestComponent;
  let fixture: ComponentFixture<FinalApproveMaterialRequestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FinalApproveMaterialRequestComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FinalApproveMaterialRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
