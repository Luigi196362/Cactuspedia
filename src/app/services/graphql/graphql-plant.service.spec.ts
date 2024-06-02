import { TestBed } from '@angular/core/testing';

import { GraphqlPlantService } from './graphql-plant.service';

describe('GetPlantService', () => {
  let service: GraphqlPlantService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GraphqlPlantService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
