import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddScopeOfWorkMaterialPriceComponent } from './add-scope-of-work-material-price.component';

describe('AddScopeOfWorkMaterialPriceComponent', () => {
  let component: AddScopeOfWorkMaterialPriceComponent;
  let fixture: ComponentFixture<AddScopeOfWorkMaterialPriceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddScopeOfWorkMaterialPriceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddScopeOfWorkMaterialPriceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
