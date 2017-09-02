import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewformsComponent } from './viewforms.component';

describe('ViewformsComponent', () => {
  let component: ViewformsComponent;
  let fixture: ComponentFixture<ViewformsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewformsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewformsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
