import { TestBed } from '@angular/core/testing';

import { GetAnchorDataService } from './get-anchor-data.service';

describe('GetAnchorDataService', () => {
  let service: GetAnchorDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GetAnchorDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
