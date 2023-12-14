import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectRoleMenuComponent } from './select-role-menu.component';

describe('SelectRoleMenuComponent', () => {
  let component: SelectRoleMenuComponent;
  let fixture: ComponentFixture<SelectRoleMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SelectRoleMenuComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SelectRoleMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
