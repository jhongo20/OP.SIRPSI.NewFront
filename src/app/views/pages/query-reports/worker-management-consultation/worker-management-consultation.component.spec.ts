import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkerManagementConsultationComponent } from './worker-management-consultation.component';

describe('WorkerManagementConsultationComponent', () => {
  let component: WorkerManagementConsultationComponent;
  let fixture: ComponentFixture<WorkerManagementConsultationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WorkerManagementConsultationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WorkerManagementConsultationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
