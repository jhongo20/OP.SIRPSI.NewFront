import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnswersEvaluationsPsychosocialComponent } from './answers-evaluations-psychosocial.component';

describe('AnswersEvaluationsPsychosocialComponent', () => {
  let component: AnswersEvaluationsPsychosocialComponent;
  let fixture: ComponentFixture<AnswersEvaluationsPsychosocialComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AnswersEvaluationsPsychosocialComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AnswersEvaluationsPsychosocialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
