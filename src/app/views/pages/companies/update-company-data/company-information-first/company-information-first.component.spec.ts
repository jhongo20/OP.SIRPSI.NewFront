import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompanyInformationFirstComponent } from './company-information-first.component';

describe('CompanyInformationFirstComponent', () => {
  let component: CompanyInformationFirstComponent;
  let fixture: ComponentFixture<CompanyInformationFirstComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CompanyInformationFirstComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CompanyInformationFirstComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
