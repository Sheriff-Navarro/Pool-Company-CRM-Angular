import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PostSignupComponent } from './post-signup.component';

describe('PostSignupComponent', () => {
  let component: PostSignupComponent;
  let fixture: ComponentFixture<PostSignupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PostSignupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PostSignupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
