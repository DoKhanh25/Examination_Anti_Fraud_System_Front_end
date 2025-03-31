import { TestBed } from '@angular/core/testing';

import { Watermarking2Service } from './watermarking2.service';

describe('Watermarking2Service', () => {
  let service: Watermarking2Service;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Watermarking2Service);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
