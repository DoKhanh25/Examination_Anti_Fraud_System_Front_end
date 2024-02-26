import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExamManagementListComponent } from './exam-management-list.component';

describe('ExamManagementListComponent', () => {
  let component: ExamManagementListComponent;
  let fixture: ComponentFixture<ExamManagementListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ExamManagementListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ExamManagementListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
