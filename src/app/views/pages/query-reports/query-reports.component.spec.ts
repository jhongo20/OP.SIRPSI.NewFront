import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QueryReportsComponent } from './query-reports.component';

describe('QueryReportsComponent', () => {
  let component: QueryReportsComponent;
  let fixture: ComponentFixture<QueryReportsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QueryReportsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(QueryReportsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
