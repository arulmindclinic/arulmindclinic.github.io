import { TestBed } from '@angular/core/testing';

import { AuthcontextService } from './authcontext.service';

describe('AuthcontextService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AuthcontextService = TestBed.get(AuthcontextService);
    expect(service).toBeTruthy();
  });
});
