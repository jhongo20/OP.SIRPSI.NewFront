import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsultationPsychosocialEvaluationValidityComponent } from './consultation-psychosocial-evaluation-validity.component';

describe('ConsultationPsychosocialEvaluationValidityComponent', () => {
  let component: ConsultationPsychosocialEvaluationValidityComponent;
  let fixture: ComponentFixture<ConsultationPsychosocialEvaluationValidityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConsultationPsychosocialEvaluationValidityComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConsultationPsychosocialEvaluationValidityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
