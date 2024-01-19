import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsentEvaluationComponent } from './consent-evaluation.component';

describe('ConsentEvaluationComponent', () => {
  let component: ConsentEvaluationComponent;
  let fixture: ComponentFixture<ConsentEvaluationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConsentEvaluationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConsentEvaluationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
