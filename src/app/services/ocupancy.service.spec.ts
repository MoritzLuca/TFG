import { TestBed } from '@angular/core/testing';

import { OcupancyService } from './ocupancy.service';

describe('OcupancyService', () => {
  let service: OcupancyService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OcupancyService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
