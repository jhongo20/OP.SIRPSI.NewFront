import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardSerachResultComponent } from './card-serach-result.component';

describe('CardSerachResultComponent', () => {
  let component: CardSerachResultComponent;
  let fixture: ComponentFixture<CardSerachResultComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CardSerachResultComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CardSerachResultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
