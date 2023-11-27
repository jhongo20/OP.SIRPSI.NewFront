import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SummonWorkerComponent } from './summon-worker.component';

describe('SummonWorkerComponent', () => {
  let component: SummonWorkerComponent;
  let fixture: ComponentFixture<SummonWorkerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SummonWorkerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SummonWorkerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
