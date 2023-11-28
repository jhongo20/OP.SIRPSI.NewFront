import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EvaluationStressQuestionnaireComponent } from './evaluation-stress-questionnaire.component';

describe('EvaluationStressQuestionnaireComponent', () => {
  let component: EvaluationStressQuestionnaireComponent;
  let fixture: ComponentFixture<EvaluationStressQuestionnaireComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EvaluationStressQuestionnaireComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EvaluationStressQuestionnaireComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
