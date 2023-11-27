import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SupportPsychosocialEvaluationComponent } from './support-psychosocial-evaluation.component';

describe('SupportPsychosocialEvaluationComponent', () => {
  let component: SupportPsychosocialEvaluationComponent;
  let fixture: ComponentFixture<SupportPsychosocialEvaluationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SupportPsychosocialEvaluationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SupportPsychosocialEvaluationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
