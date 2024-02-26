import { TestBed } from '@angular/core/testing';

import { ExamWebsocketService } from './exam-websocket.service';

describe('ExamWebsocketService', () => {
  let service: ExamWebsocketService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ExamWebsocketService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
