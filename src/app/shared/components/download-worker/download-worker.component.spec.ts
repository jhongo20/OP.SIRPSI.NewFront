import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DownloadWorkerComponent } from './download-worker.component';

describe('DownloadWorkerComponent', () => {
  let component: DownloadWorkerComponent;
  let fixture: ComponentFixture<DownloadWorkerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DownloadWorkerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DownloadWorkerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
