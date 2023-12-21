import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsolidatedResultFactorsRiskFormBComponent } from './consolidated-result-factors-risk-form-b.component';

describe('ConsolidatedResultFactorsRiskFormBComponent', () => {
  let component: ConsolidatedResultFactorsRiskFormBComponent;
  let fixture: ComponentFixture<ConsolidatedResultFactorsRiskFormBComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConsolidatedResultFactorsRiskFormBComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConsolidatedResultFactorsRiskFormBComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
