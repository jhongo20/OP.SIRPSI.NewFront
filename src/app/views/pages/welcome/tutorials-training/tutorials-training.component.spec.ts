import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TutorialsTrainingComponent } from './tutorials-training.component';

describe('TutorialsTrainingComponent', () => {
  let component: TutorialsTrainingComponent;
  let fixture: ComponentFixture<TutorialsTrainingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TutorialsTrainingComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TutorialsTrainingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
