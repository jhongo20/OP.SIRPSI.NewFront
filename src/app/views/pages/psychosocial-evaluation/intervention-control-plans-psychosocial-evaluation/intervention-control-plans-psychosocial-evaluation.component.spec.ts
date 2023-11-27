import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InterventionControlPlansPsychosocialEvaluationComponent } from './intervention-control-plans-psychosocial-evaluation.component';

describe('InterventionControlPlansPsychosocialEvaluationComponent', () => {
  let component: InterventionControlPlansPsychosocialEvaluationComponent;
  let fixture: ComponentFixture<InterventionControlPlansPsychosocialEvaluationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InterventionControlPlansPsychosocialEvaluationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InterventionControlPlansPsychosocialEvaluationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
