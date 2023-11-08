import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FaqsItemsComponent } from './faqs-items.component';

describe('FaqsItemsComponent', () => {
  let component: FaqsItemsComponent;
  let fixture: ComponentFixture<FaqsItemsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FaqsItemsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FaqsItemsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
