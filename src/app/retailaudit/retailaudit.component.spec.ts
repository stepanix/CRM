import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RetailauditComponent } from './retailaudit.component';

describe('RetailauditComponent', () => {
  let component: RetailauditComponent;
  let fixture: ComponentFixture<RetailauditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RetailauditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RetailauditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
