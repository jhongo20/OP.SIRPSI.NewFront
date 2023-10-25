import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssignWorkCentersUserFormComponent } from './assign-work-centers-user-form.component';

describe('AssignWorkCentersUserFormComponent', () => {
  let component: AssignWorkCentersUserFormComponent;
  let fixture: ComponentFixture<AssignWorkCentersUserFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AssignWorkCentersUserFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AssignWorkCentersUserFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
