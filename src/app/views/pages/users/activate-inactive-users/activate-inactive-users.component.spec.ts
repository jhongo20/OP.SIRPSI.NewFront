import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActivateInactiveUsersComponent } from './activate-inactive-users.component';

describe('ActivateInactiveUsersComponent', () => {
  let component: ActivateInactiveUsersComponent;
  let fixture: ComponentFixture<ActivateInactiveUsersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ActivateInactiveUsersComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ActivateInactiveUsersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
