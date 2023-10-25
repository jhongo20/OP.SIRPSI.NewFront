import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GenerateFiledEvaluationPsychosocialComponent } from './generate-filed-evaluation-psychosocial.component';

describe('GenerateFiledEvaluationPsychosocialComponent', () => {
  let component: GenerateFiledEvaluationPsychosocialComponent;
  let fixture: ComponentFixture<GenerateFiledEvaluationPsychosocialComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GenerateFiledEvaluationPsychosocialComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GenerateFiledEvaluationPsychosocialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
