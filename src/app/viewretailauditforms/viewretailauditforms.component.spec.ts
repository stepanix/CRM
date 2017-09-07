import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewretailauditformsComponent } from './viewretailauditforms.component';

describe('ViewretailauditformsComponent', () => {
  let component: ViewretailauditformsComponent;
  let fixture: ComponentFixture<ViewretailauditformsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewretailauditformsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewretailauditformsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
