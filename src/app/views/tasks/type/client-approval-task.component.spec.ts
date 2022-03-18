import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientApprovalTaskComponent } from './client-approval-task.component';

describe('ClientApprovalTaskComponent', () => {
  let component: ClientApprovalTaskComponent;
  let fixture: ComponentFixture<ClientApprovalTaskComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClientApprovalTaskComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ClientApprovalTaskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
