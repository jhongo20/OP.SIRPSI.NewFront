import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfigurationVariablesFormComponent } from './configuration-variables-form.component';

describe('ConfigurationVariablesFormComponent', () => {
  let component: ConfigurationVariablesFormComponent;
  let fixture: ComponentFixture<ConfigurationVariablesFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConfigurationVariablesFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConfigurationVariablesFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
