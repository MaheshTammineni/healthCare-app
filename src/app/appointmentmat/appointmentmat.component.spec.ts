import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppointmentmatComponent } from './appointmentmat.component';

describe('AppointmentmatComponent', () => {
  let component: AppointmentmatComponent;
  let fixture: ComponentFixture<AppointmentmatComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AppointmentmatComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AppointmentmatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
