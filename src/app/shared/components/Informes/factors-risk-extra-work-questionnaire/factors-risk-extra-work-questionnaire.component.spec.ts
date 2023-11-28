import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FactorsRiskExtraWorkQuestionnaireComponent } from './factors-risk-extra-work-questionnaire.component';

describe('FactorsRiskExtraWorkQuestionnaireComponent', () => {
  let component: FactorsRiskExtraWorkQuestionnaireComponent;
  let fixture: ComponentFixture<FactorsRiskExtraWorkQuestionnaireComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FactorsRiskExtraWorkQuestionnaireComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FactorsRiskExtraWorkQuestionnaireComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
