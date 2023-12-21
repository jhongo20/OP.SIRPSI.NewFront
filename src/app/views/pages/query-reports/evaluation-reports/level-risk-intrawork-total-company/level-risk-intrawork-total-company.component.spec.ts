import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LevelRiskIntraworkTotalCompanyComponent } from './level-risk-intrawork-total-company.component';

describe('LevelRiskIntraworkTotalCompanyComponent', () => {
  let component: LevelRiskIntraworkTotalCompanyComponent;
  let fixture: ComponentFixture<LevelRiskIntraworkTotalCompanyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LevelRiskIntraworkTotalCompanyComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LevelRiskIntraworkTotalCompanyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
