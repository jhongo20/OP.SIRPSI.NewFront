import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResultsIntraWorkFactorsQuestionnaireComponent } from './results-intra-work-factors-questionnaire.component';

describe('ResultsIntraWorkFactorsQuestionnaireComponent', () => {
  let component: ResultsIntraWorkFactorsQuestionnaireComponent;
  let fixture: ComponentFixture<ResultsIntraWorkFactorsQuestionnaireComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ResultsIntraWorkFactorsQuestionnaireComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ResultsIntraWorkFactorsQuestionnaireComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
