import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkerDataFormComponent } from './worker-data-form.component';

describe('WorkerDataFormComponent', () => {
  let component: WorkerDataFormComponent;
  let fixture: ComponentFixture<WorkerDataFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WorkerDataFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WorkerDataFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
