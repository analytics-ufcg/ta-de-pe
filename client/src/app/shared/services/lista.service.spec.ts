import { TestBed } from '@angular/core/testing';

import { ListaService } from './lista.service';

describe('ListaService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ListaService = TestBed.inject(ListaService);
    expect(service).toBeTruthy();
  });
});
