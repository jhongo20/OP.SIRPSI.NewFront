import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsolidatedResultStressComponent } from './consolidated-result-stress.component';

describe('ConsolidatedResultStressComponent', () => {
  let component: ConsolidatedResultStressComponent;
  let fixture: ComponentFixture<ConsolidatedResultStressComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConsolidatedResultStressComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConsolidatedResultStressComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
