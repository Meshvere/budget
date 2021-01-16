import { TestBed } from '@angular/core/testing';

import { FoodTicketService } from './food-ticket.service';

describe('FoodTicketService', () => {
  let service: FoodTicketService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FoodTicketService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
