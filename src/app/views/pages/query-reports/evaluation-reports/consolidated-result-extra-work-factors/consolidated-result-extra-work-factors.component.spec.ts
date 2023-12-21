import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsolidatedResultExtraWorkFactorsComponent } from './consolidated-result-extra-work-factors.component';

describe('ConsolidatedResultExtraWorkFactorsComponent', () => {
  let component: ConsolidatedResultExtraWorkFactorsComponent;
  let fixture: ComponentFixture<ConsolidatedResultExtraWorkFactorsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConsolidatedResultExtraWorkFactorsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConsolidatedResultExtraWorkFactorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
