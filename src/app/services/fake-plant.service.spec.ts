import { TestBed } from '@angular/core/testing';

import { FakePlantService } from './fake-plant.service';

describe('FakePlantService', () => {
  let service: FakePlantService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FakePlantService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
