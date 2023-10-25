import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PerformPsychosocialEvaluationComponent } from './perform-psychosocial-evaluation.component';

describe('PerformPsychosocialEvaluationComponent', () => {
  let component: PerformPsychosocialEvaluationComponent;
  let fixture: ComponentFixture<PerformPsychosocialEvaluationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PerformPsychosocialEvaluationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PerformPsychosocialEvaluationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
