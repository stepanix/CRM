import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportscheduledetailsComponent } from './reportscheduledetails.component';

describe('ReportscheduledetailsComponent', () => {
  let component: ReportscheduledetailsComponent;
  let fixture: ComponentFixture<ReportscheduledetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReportscheduledetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportscheduledetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
