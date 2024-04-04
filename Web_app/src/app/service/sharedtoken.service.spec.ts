import { TestBed } from '@angular/core/testing';

import { SharedtokenService } from './sharedtoken.service';

describe('SharedtokenService', () => {
  let service: SharedtokenService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SharedtokenService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
