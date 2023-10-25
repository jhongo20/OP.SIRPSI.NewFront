import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkCentersFormComponent } from './work-centers-form.component';

describe('WorkCentersFormComponent', () => {
  let component: WorkCentersFormComponent;
  let fixture: ComponentFixture<WorkCentersFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WorkCentersFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WorkCentersFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
