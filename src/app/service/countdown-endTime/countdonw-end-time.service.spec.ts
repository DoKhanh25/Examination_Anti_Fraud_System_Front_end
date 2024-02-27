import { TestBed } from '@angular/core/testing';

import { CountdonwEndTimeService } from './countdonw-end-time.service';

describe('CountdonwEndTimeService', () => {
  let service: CountdonwEndTimeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CountdonwEndTimeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
