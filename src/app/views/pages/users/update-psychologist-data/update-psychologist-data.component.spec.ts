import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdatePsychologistDataComponent } from './update-psychologist-data.component';

describe('UpdatePsychologistDataComponent', () => {
  let component: UpdatePsychologistDataComponent;
  let fixture: ComponentFixture<UpdatePsychologistDataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdatePsychologistDataComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdatePsychologistDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
