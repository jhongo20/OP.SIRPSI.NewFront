import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterEvaluationComponent } from './register-evaluation.component';

describe('RegisterEvaluationComponent', () => {
  let component: RegisterEvaluationComponent;
  let fixture: ComponentFixture<RegisterEvaluationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegisterEvaluationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegisterEvaluationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
