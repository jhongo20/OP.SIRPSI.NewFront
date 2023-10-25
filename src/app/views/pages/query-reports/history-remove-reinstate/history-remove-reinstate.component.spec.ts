import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HistoryRemoveReinstateComponent } from './history-remove-reinstate.component';

describe('HistoryRemoveReinstateComponent', () => {
  let component: HistoryRemoveReinstateComponent;
  let fixture: ComponentFixture<HistoryRemoveReinstateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HistoryRemoveReinstateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HistoryRemoveReinstateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
