import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddnewappointComponent } from './addnewappoint.component';

describe('AddnewappointComponent', () => {
  let component: AddnewappointComponent;
  let fixture: ComponentFixture<AddnewappointComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddnewappointComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddnewappointComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
