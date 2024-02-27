import { TestBed } from '@angular/core/testing';

import { ExamStudentService } from './exam-student.service';

describe('ExamStudentService', () => {
  let service: ExamStudentService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ExamStudentService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
