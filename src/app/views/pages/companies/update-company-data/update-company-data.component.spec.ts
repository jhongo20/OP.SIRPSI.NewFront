import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateCompanyDataComponent } from './update-company-data.component';

describe('UpdateCompanyDataComponent', () => {
  let component: UpdateCompanyDataComponent;
  let fixture: ComponentFixture<UpdateCompanyDataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateCompanyDataComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdateCompanyDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
