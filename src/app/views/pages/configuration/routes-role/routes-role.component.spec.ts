import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RoutesRoleComponent } from './routes-role.component';

describe('RoutesRoleComponent', () => {
  let component: RoutesRoleComponent;
  let fixture: ComponentFixture<RoutesRoleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RoutesRoleComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RoutesRoleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
