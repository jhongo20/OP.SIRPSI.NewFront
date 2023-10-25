import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterNewUsersComponent } from './register-new-users.component';

describe('RegisterNewUsersComponent', () => {
  let component: RegisterNewUsersComponent;
  let fixture: ComponentFixture<RegisterNewUsersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegisterNewUsersComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegisterNewUsersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
