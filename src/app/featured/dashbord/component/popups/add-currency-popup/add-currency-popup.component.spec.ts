import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddCurrencyPopupComponent } from './add-currency-popup.component';

describe('AddCurrencyPopupComponent', () => {
  let component: AddCurrencyPopupComponent;
  let fixture: ComponentFixture<AddCurrencyPopupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddCurrencyPopupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddCurrencyPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
