import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CoverageDataComponent } from './coverage-data.component';

describe('CoverageDataComponent', () => {
  let component: CoverageDataComponent;
  let fixture: ComponentFixture<CoverageDataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CoverageDataComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CoverageDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
