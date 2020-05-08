import { TestBed } from '@angular/core/testing';

import { MedicionesService } from './mediciones.service';

describe('MedicionesService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MedicionesService = TestBed.get(MedicionesService);
    expect(service).toBeTruthy();
  });
});
