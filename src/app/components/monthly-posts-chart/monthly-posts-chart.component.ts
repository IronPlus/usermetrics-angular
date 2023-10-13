import { Component, Input, OnInit } from '@angular/core';
import { ChartConfiguration } from 'chart.js';
@Component({
  selector: 'app-monthly-posts-chart',
  templateUrl: './monthly-posts-chart.component.html',
  styleUrls: ['./monthly-posts-chart.component.scss'],
})
export class MonthlyPostsChartComponent implements OnInit {
  @Input() monthlyPostsStatistics!: number[];

  labels = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];

  barChartLegend = true;
  barChartPlugins = [];
  barChartData!: ChartConfiguration<'bar'>['data'];
  barChartOptions: ChartConfiguration<'bar'>['options'] = {
    responsive: true,
  };

  ngOnInit(): void {
    this.barChartData = {
      labels: this.labels,
      datasets: [
        {
          label: 'Number of posts',
          data: this.monthlyPostsStatistics,
          backgroundColor: 'rgba(255, 99, 132, 0.5)',
        },
      ],
    };
  }
}
