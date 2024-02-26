import { TestBed } from '@angular/core/testing';

import { WatermarkingService } from './watermarking.service';

describe('WatermarkingService', () => {
  let service: WatermarkingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WatermarkingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
