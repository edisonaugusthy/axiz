import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddCostCenterAccessComponent } from './add-cost-center-access.component';

describe('AddCostCenterAccessComponent', () => {
  let component: AddCostCenterAccessComponent;
  let fixture: ComponentFixture<AddCostCenterAccessComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddCostCenterAccessComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddCostCenterAccessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
