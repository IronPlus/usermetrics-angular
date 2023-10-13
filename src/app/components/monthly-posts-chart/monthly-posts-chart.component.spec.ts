import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MonthlyPostsChartComponent } from './monthly-posts-chart.component';

describe('MonthlyPostsChartComponent', () => {
  let component: MonthlyPostsChartComponent;
  let fixture: ComponentFixture<MonthlyPostsChartComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MonthlyPostsChartComponent]
    });
    fixture = TestBed.createComponent(MonthlyPostsChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
