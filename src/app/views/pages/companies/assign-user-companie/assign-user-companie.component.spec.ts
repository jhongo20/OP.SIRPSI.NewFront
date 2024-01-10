import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssignUserCompanieComponent } from './assign-user-companie.component';

describe('AssignUserCompanieComponent', () => {
  let component: AssignUserCompanieComponent;
  let fixture: ComponentFixture<AssignUserCompanieComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AssignUserCompanieComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AssignUserCompanieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
