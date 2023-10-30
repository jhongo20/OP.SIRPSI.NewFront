import { TestBed } from '@angular/core/testing';

import { PsychosocialQuestionnaireService } from './psychosocial-questionnaire.service';

describe('PsychosocialQuestionnaireService', () => {
  let service: PsychosocialQuestionnaireService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PsychosocialQuestionnaireService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
