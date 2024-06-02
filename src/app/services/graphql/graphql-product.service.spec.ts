import { TestBed } from '@angular/core/testing';

import { GraphqlProductService } from './graphql-product.service';

describe('GraphqlProductService', () => {
  let service: GraphqlProductService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GraphqlProductService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
