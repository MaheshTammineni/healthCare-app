import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GrowthmainComponent } from './growthmain.component';

describe('GrowthmainComponent', () => {
  let component: GrowthmainComponent;
  let fixture: ComponentFixture<GrowthmainComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GrowthmainComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GrowthmainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
