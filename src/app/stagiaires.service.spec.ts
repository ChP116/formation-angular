import { TestBed } from '@angular/core/testing';

import { StagiairesService } from './stagiaires.service';

describe('StagiairesService', () => {
  let service: StagiairesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StagiairesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
