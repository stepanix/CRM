import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddrepresentativeComponent } from './addrepresentative.component';

describe('AddrepresentativeComponent', () => {
  let component: AddrepresentativeComponent;
  let fixture: ComponentFixture<AddrepresentativeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddrepresentativeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddrepresentativeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
