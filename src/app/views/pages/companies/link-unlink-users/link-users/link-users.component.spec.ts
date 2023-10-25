import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LinkUsersComponent } from './link-users.component';

describe('LinkUsersComponent', () => {
  let component: LinkUsersComponent;
  let fixture: ComponentFixture<LinkUsersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LinkUsersComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LinkUsersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
