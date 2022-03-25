import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MaterialRequestListComponent } from './list.component';

describe('MaterialRequestListComponent', () => {
  let component: MaterialRequestListComponent;
  let fixture: ComponentFixture<MaterialRequestListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MaterialRequestListComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MaterialRequestListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
