import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsersCompanyNotAffiliatedComponent } from './users-company-not-affiliated.component';

describe('UsersCompanyNotAffiliatedComponent', () => {
  let component: UsersCompanyNotAffiliatedComponent;
  let fixture: ComponentFixture<UsersCompanyNotAffiliatedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UsersCompanyNotAffiliatedComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UsersCompanyNotAffiliatedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
