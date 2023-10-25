import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OccupationalLicenseComponent } from './occupational-license.component';

describe('OccupationalLicenseComponent', () => {
  let component: OccupationalLicenseComponent;
  let fixture: ComponentFixture<OccupationalLicenseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OccupationalLicenseComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OccupationalLicenseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
