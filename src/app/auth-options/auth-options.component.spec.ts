import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthOptionsComponent } from './auth-options.component';

describe('AuthOptionsComponent', () => {
  let component: AuthOptionsComponent;
  let fixture: ComponentFixture<AuthOptionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AuthOptionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AuthOptionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
