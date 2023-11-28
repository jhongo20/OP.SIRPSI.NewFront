import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResultsIntraWorkFactorsQuestionnaireFormBComponent } from './results-intra-work-factors-questionnaire-form-b.component';

describe('ResultsIntraWorkFactorsQuestionnaireFormBComponent', () => {
  let component: ResultsIntraWorkFactorsQuestionnaireFormBComponent;
  let fixture: ComponentFixture<ResultsIntraWorkFactorsQuestionnaireFormBComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ResultsIntraWorkFactorsQuestionnaireFormBComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ResultsIntraWorkFactorsQuestionnaireFormBComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
