import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AllServicesPageComponent } from './all-services-page.component';

describe('AllServicesPageComponent', () => {
  let component: AllServicesPageComponent;
  let fixture: ComponentFixture<AllServicesPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AllServicesPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AllServicesPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
