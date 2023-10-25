import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssignWorkCentersFormComponent } from './assign-work-centers-form.component';

describe('AssignWorkCentersFormComponent', () => {
  let component: AssignWorkCentersFormComponent;
  let fixture: ComponentFixture<AssignWorkCentersFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AssignWorkCentersFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AssignWorkCentersFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
