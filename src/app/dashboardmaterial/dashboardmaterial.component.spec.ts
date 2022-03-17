import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardmaterialComponent } from './dashboardmaterial.component';

describe('DashboardmaterialComponent', () => {
  let component: DashboardmaterialComponent;
  let fixture: ComponentFixture<DashboardmaterialComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DashboardmaterialComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardmaterialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
