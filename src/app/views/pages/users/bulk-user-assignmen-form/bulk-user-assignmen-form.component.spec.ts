import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BulkUserAssignmenFormComponent } from './bulk-user-assignmen-form.component';

describe('BulkUserAssignmenFormComponent', () => {
  let component: BulkUserAssignmenFormComponent;
  let fixture: ComponentFixture<BulkUserAssignmenFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BulkUserAssignmenFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BulkUserAssignmenFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
