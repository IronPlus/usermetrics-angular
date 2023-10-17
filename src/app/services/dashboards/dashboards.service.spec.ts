import { TestBed } from '@angular/core/testing';

import { HttpClientTestingModule } from '@angular/common/http/testing';
import { DashboardsService } from './dashboards.service';

describe('DashboardsService', () => {
  let service: DashboardsService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(DashboardsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  // TODO: Add tests for the other methods.
});
