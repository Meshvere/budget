import { TestBed } from '@angular/core/testing';

import { PelletsService } from './pellets.service';

describe('PelletsService', () => {
  let service: PelletsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PelletsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
