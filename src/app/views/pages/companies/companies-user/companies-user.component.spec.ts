import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompaniesUserComponent } from './companies-user.component';

describe('CompaniesUserComponent', () => {
  let component: CompaniesUserComponent;
  let fixture: ComponentFixture<CompaniesUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CompaniesUserComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CompaniesUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
