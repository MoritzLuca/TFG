import { TestBed } from '@angular/core/testing';

import { InfoAnchorService } from './info-anchor.service';

describe('InfoAnchorService', () => {
  let service: InfoAnchorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InfoAnchorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
