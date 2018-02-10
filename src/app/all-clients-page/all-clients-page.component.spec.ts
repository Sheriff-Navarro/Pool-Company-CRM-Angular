import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AllClientsPageComponent } from './all-clients-page.component';

describe('ClientsPageComponent', () => {
  let component: AllClientsPageComponent;
  let fixture: ComponentFixture<AllClientsPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AllClientsPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AllClientsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
