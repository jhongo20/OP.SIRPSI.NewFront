import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LinkUnlinkUsersComponent } from './link-unlink-users.component';

describe('LinkUnlinkUsersComponent', () => {
  let component: LinkUnlinkUsersComponent;
  let fixture: ComponentFixture<LinkUnlinkUsersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LinkUnlinkUsersComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LinkUnlinkUsersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
