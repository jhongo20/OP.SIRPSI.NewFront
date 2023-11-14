import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GeneralDataSheetComponent } from './general-data-sheet.component';

describe('GeneralDataSheetComponent', () => {
  let component: GeneralDataSheetComponent;
  let fixture: ComponentFixture<GeneralDataSheetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GeneralDataSheetComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GeneralDataSheetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
