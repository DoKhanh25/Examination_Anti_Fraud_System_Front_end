import { Component } from '@angular/core';
import { ExamManagementService } from '../service/exam-management/exam-management.service';
import { ExamProblemModel } from '../model/examManagement.model';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-exam-management',
  templateUrl: './exam-management.component.html',
  styleUrl: './exam-management.component.css'
})
export class ExamManagementComponent {
  studentAccountsOption: string[] = [];

  examMangementModel: ExamProblemModel = {
    examTitle: "",
    examDescription: "",
    startTime: new Date(),
    endTime: new Date(),
    duration: 0,
    createBy: "",
    examParticipantSet: []
  }

  durationMinute: number = 0;
  durationSecond: number = 0;

  constructor(public examManagementService: ExamManagementService, public toastrService: ToastrService) {
  }

  ngOnInit(): void {
    this.examMangementModel.createBy = localStorage.getItem("username") || "";

    this.examManagementService.getStudentAccounts().subscribe(
      (res) => {
        this.studentAccountsOption = res.data
      }
    )
  }

  handleCalendarData() {
    // Calculate duration in seconds
    this.examMangementModel.duration = Number(this.durationMinute) * 60 + Number(this.durationSecond);
    
    // No need to set hours and minutes separately as p-calendar now handles the full datetime
  }

  validate() {
    if (this.isNullOrEmptyString(this.examMangementModel.examTitle)
      || this.isNullOrEmptyString(this.examMangementModel.examDescription)
      || this.examMangementModel.examParticipantSet.length == 0) {
      return 1;
    }
    if (this.examMangementModel.duration == 0) {
      return 2;
    }
    if (this.examMangementModel.startTime == null || this.examMangementModel.endTime == null) {
      return 3;
    }
    if (this.examMangementModel.startTime.getTime() > this.examMangementModel.endTime.getTime()) {
      return 4;
    }
    if (this.examMangementModel.startTime.getTime() < new Date().getTime() 
        && this.examMangementModel.endTime.getTime() < new Date().getTime()) {
      return 5;
    }

    return 6;
  }

  submit() {
    this.handleCalendarData();

    if (this.validate() == 1) {
      this.toastrService.error("Bạn chưa nhập đủ thông tin bài thi");
      return;
    } else if (this.validate() == 2) {
      this.toastrService.error("Bạn chưa nhập thời gian làm bài");
      return;
    } else if (this.validate() == 3) {
      this.toastrService.error("Bạn chưa nhập thời gian bắt đầu và kết thúc");
      return;
    } else if (this.validate() == 4) {
      this.toastrService.error("Thời gian bắt đầu phải nhỏ hơn thời gian kết thúc");
      return;
    } else if (this.validate() == 5) {
      this.toastrService.error("Thời gian bắt đầu và kết thúc phải lớn hơn thời gian hiện tại");
      return;
    }

    this.examManagementService.saveExam(this.examMangementModel).subscribe((res) => {
      this.toastrService.success("Tạo bài thi thành công");
      this.resetPage();
    },
      (err) => {
        this.toastrService.error("Lỗi server");
      })
  }

  isNullOrEmptyString(value: any) {
    if (value == null || value == '') {
      return true;
    } else {
      return false;
    }
  }

  resetPage() {
    this.examMangementModel = {
      examTitle: "",
      examDescription: "",
      startTime: new Date(),
      endTime: new Date(),
      duration: 0,
      createBy: "",
      examParticipantSet: []
    }

    this.durationMinute = 0;
    this.durationSecond = 0;

    this.ngOnInit();
  }
}