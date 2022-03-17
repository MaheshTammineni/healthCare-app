import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EducationmatComponent } from './educationmat.component';

describe('EducationmatComponent', () => {
  let component: EducationmatComponent;
  let fixture: ComponentFixture<EducationmatComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EducationmatComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EducationmatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
