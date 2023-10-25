import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SummonWorkersComponent } from './summon-workers.component';

describe('SummonWorkersComponent', () => {
  let component: SummonWorkersComponent;
  let fixture: ComponentFixture<SummonWorkersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SummonWorkersComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SummonWorkersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
