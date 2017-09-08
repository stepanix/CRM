import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewtenantsComponent } from './viewtenants.component';

describe('ViewtenantsComponent', () => {
  let component: ViewtenantsComponent;
  let fixture: ComponentFixture<ViewtenantsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewtenantsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewtenantsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
