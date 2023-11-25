import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComplementaryCompanyDataComponent } from './complementary-company-data.component';

describe('ComplementaryCompanyDataComponent', () => {
  let component: ComplementaryCompanyDataComponent;
  let fixture: ComponentFixture<ComplementaryCompanyDataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ComplementaryCompanyDataComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ComplementaryCompanyDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
