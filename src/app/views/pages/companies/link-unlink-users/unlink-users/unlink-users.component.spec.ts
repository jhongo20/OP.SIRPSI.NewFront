import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UnlinkUsersComponent } from './unlink-users.component';

describe('UnlinkUsersComponent', () => {
  let component: UnlinkUsersComponent;
  let fixture: ComponentFixture<UnlinkUsersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UnlinkUsersComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UnlinkUsersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
