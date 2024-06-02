import { TestBed } from '@angular/core/testing';

import { GraphqlGameService } from './graphql-game.service';

describe('GraphqlGamesService', () => {
  let service: GraphqlGameService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GraphqlGameService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
