import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsolidatedResultFactorsRiskComponent } from './consolidated-result-factors-risk.component';

describe('ConsolidatedResultFactorsRiskComponent', () => {
  let component: ConsolidatedResultFactorsRiskComponent;
  let fixture: ComponentFixture<ConsolidatedResultFactorsRiskComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConsolidatedResultFactorsRiskComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConsolidatedResultFactorsRiskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
