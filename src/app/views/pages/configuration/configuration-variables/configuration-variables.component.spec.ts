import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfigurationVariablesComponent } from './configuration-variables.component';

describe('ConfigurationVariablesComponent', () => {
  let component: ConfigurationVariablesComponent;
  let fixture: ComponentFixture<ConfigurationVariablesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConfigurationVariablesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConfigurationVariablesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
