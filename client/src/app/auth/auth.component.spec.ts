import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { authComponent } from './auth.component';

describe('LoginComponent', () => {
  let component: authComponent;
  let fixture: ComponentFixture<authComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ authComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(authComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
