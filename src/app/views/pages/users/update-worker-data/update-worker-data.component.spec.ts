import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateWorkerDataComponent } from './update-worker-data.component';

describe('UpdateWorkerDataComponent', () => {
  let component: UpdateWorkerDataComponent;
  let fixture: ComponentFixture<UpdateWorkerDataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateWorkerDataComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdateWorkerDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
