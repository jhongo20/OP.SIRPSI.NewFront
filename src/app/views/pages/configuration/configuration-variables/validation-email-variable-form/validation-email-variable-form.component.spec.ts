import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ValidationEmailVariableFormComponent } from './validation-email-variable-form.component';

describe('ValidationEmailVariableFormComponent', () => {
  let component: ValidationEmailVariableFormComponent;
  let fixture: ComponentFixture<ValidationEmailVariableFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ValidationEmailVariableFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ValidationEmailVariableFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
