import { TestBed } from '@angular/core/testing';

import { PokeService } from './poke.service';

describe('PokeServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PokeService = TestBed.get(PokeService);
    expect(service).toBeTruthy();
  });
});
