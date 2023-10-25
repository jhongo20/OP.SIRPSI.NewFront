import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterNewWorkerComponent } from './register-new-worker.component';

describe('RegisterNewWorkerComponent', () => {
  let component: RegisterNewWorkerComponent;
  let fixture: ComponentFixture<RegisterNewWorkerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegisterNewWorkerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegisterNewWorkerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
