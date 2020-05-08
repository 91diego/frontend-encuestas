import { TestBed } from '@angular/core/testing';

import { FasesService } from './fases.service';

describe('FasesService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: FasesService = TestBed.get(FasesService);
    expect(service).toBeTruthy();
  });
});
