import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewplacesComponent } from './viewplaces.component';

describe('ViewplacesComponent', () => {
  let component: ViewplacesComponent;
  let fixture: ComponentFixture<ViewplacesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewplacesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewplacesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
