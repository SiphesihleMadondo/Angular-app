import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SecondChartComponent } from './second-chart.component';

describe('SecondChartComponent', () => {
  let component: SecondChartComponent;
  let fixture: ComponentFixture<SecondChartComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SecondChartComponent]
    });
    fixture = TestBed.createComponent(SecondChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
