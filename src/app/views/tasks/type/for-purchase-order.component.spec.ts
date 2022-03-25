import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ForPurchaseOrderComponent } from './for-purchase-order.component';

describe('ForPurchaseOrderComponent', () => {
  let component: ForPurchaseOrderComponent;
  let fixture: ComponentFixture<ForPurchaseOrderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ForPurchaseOrderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ForPurchaseOrderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
