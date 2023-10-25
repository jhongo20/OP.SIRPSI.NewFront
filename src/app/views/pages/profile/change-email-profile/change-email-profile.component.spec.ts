import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangeEmailProfileComponent } from './change-email-profile.component';

describe('ChangeEmailProfileComponent', () => {
  let component: ChangeEmailProfileComponent;
  let fixture: ComponentFixture<ChangeEmailProfileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChangeEmailProfileComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChangeEmailProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
