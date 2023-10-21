import { Component, OnInit } from '@angular/core';
import { Observable, catchError } from 'rxjs';
import { Dashboard } from 'src/app/models/dashboard.model';
import { DashboardsService } from 'src/app/services/dashboards/dashboards.service';

@Component({
  selector: 'app-dashboards',
  templateUrl: './dashboards.component.html',
  styleUrls: ['./dashboards.component.scss'],
})
export class DashboardsComponent implements OnInit {
  dashboards$!: Observable<Dashboard[]>;
  errorMessage = '';

  constructor(private dashboardService: DashboardsService) {}

  ngOnInit(): void {
    this.dashboards$ = this.dashboardService.getDashBoards().pipe(
      catchError((err) => {
        this.errorMessage = err.message;
        return [];
      })
    );
  }
}
