import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewproductsComponent } from './viewproducts.component';

describe('ViewproductsComponent', () => {
  let component: ViewproductsComponent;
  let fixture: ComponentFixture<ViewproductsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewproductsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewproductsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
