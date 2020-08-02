/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { RequstsComponent } from './requsts.component';

describe('RequstsComponent', () => {
  let component: RequstsComponent;
  let fixture: ComponentFixture<RequstsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RequstsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RequstsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
