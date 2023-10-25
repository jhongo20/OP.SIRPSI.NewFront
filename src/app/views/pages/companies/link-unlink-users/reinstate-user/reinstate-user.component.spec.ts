import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReinstateUserComponent } from './reinstate-user.component';

describe('ReinstateUserComponent', () => {
  let component: ReinstateUserComponent;
  let fixture: ComponentFixture<ReinstateUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReinstateUserComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReinstateUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
