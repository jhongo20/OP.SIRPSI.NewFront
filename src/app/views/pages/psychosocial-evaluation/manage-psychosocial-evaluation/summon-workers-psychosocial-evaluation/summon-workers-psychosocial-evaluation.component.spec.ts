import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SummonWorkersPsychosocialEvaluationComponent } from './summon-workers-psychosocial-evaluation.component';

describe('SummonWorkersPsychosocialEvaluationComponent', () => {
  let component: SummonWorkersPsychosocialEvaluationComponent;
  let fixture: ComponentFixture<SummonWorkersPsychosocialEvaluationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SummonWorkersPsychosocialEvaluationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SummonWorkersPsychosocialEvaluationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
