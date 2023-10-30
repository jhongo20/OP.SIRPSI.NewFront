import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NonWorkFactorsQuestionnaireComponent } from './non-work-factors-questionnaire.component';

describe('NonWorkFactorsQuestionnaireComponent', () => {
  let component: NonWorkFactorsQuestionnaireComponent;
  let fixture: ComponentFixture<NonWorkFactorsQuestionnaireComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NonWorkFactorsQuestionnaireComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NonWorkFactorsQuestionnaireComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
