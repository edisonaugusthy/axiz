import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddChainPopupComponent } from './add-chain-popup.component';

describe('AddChainPopupComponent', () => {
  let component: AddChainPopupComponent;
  let fixture: ComponentFixture<AddChainPopupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddChainPopupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddChainPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
