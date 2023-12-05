import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListStatusUsersEvaluationComponent } from './list-status-users-evaluation.component';

describe('ListStatusUsersEvaluationComponent', () => {
  let component: ListStatusUsersEvaluationComponent;
  let fixture: ComponentFixture<ListStatusUsersEvaluationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListStatusUsersEvaluationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListStatusUsersEvaluationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
