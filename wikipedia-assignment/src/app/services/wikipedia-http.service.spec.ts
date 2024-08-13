import { TestBed } from '@angular/core/testing';

import { WikipediaHttpService } from './wikipedia-http.service';

describe('WikipediaHttpService', () => {
  let service: WikipediaHttpService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WikipediaHttpService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
