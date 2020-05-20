import { TestBed } from '@angular/core/testing';

import { EnviosService } from './envios.service';

describe('EnviosService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: EnviosService = TestBed.get(EnviosService);
    expect(service).toBeTruthy();
  });
});
