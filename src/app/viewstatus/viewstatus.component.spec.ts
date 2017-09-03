import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewstatusComponent } from './viewstatus.component';

describe('ViewstatusComponent', () => {
  let component: ViewstatusComponent;
  let fixture: ComponentFixture<ViewstatusComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewstatusComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewstatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
