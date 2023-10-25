import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdvancesPsychosocialEvaluationComponent } from './advances-psychosocial-evaluation.component';

describe('AdvancesPsychosocialEvaluationComponent', () => {
  let component: AdvancesPsychosocialEvaluationComponent;
  let fixture: ComponentFixture<AdvancesPsychosocialEvaluationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdvancesPsychosocialEvaluationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdvancesPsychosocialEvaluationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
