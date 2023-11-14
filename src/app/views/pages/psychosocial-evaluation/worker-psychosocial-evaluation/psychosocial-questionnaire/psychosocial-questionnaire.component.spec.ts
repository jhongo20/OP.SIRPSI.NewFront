import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PsychosocialQuestionnaireComponent } from './psychosocial-questionnaire.component';

describe('PsychosocialQuestionnaireComponent', () => {
  let component: PsychosocialQuestionnaireComponent;
  let fixture: ComponentFixture<PsychosocialQuestionnaireComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PsychosocialQuestionnaireComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PsychosocialQuestionnaireComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
