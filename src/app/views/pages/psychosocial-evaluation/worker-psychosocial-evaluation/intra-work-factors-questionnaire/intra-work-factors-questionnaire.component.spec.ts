import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IntraWorkFactorsQuestionnaireComponent } from './intra-work-factors-questionnaire.component';

describe('IntraWorkFactorsQuestionnaireComponent', () => {
  let component: IntraWorkFactorsQuestionnaireComponent;
  let fixture: ComponentFixture<IntraWorkFactorsQuestionnaireComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IntraWorkFactorsQuestionnaireComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IntraWorkFactorsQuestionnaireComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
