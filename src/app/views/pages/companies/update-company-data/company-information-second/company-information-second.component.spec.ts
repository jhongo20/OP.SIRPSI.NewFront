import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompanyInformationSecondComponent } from './company-information-second.component';

describe('CompanyInformationSecondComponent', () => {
  let component: CompanyInformationSecondComponent;
  let fixture: ComponentFixture<CompanyInformationSecondComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CompanyInformationSecondComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CompanyInformationSecondComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
