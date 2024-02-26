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
    endTime:  new Date(),
    duration: 0,
    createBy: "",
    examParticipantSet: []
  }

  startTimeHour: any;
  startTimeMinute: any;
  endTimeHour : any;
  endTimeMinute : any;
  durationMinute: any;
  durationSecond : any;




  constructor(public examManagementService: ExamManagementService, public toastrService: ToastrService){
  }

  ngOnInit(): void {
    this.examMangementModel.createBy = localStorage.getItem("username") || "";

    this.examManagementService.getStudentAccounts().subscribe(
      (res) => {
        console.log(res);
        this.studentAccountsOption = res.data
      }
      )
    
  }

  handleCalendarData(){
    this.examMangementModel.duration = Number(this.durationMinute)*60 + Number(this.durationSecond);

    this.examMangementModel.startTime?.setHours(this.startTimeHour);
    this.examMangementModel.startTime?.setMinutes(this.startTimeMinute);

    this.examMangementModel.endTime?.setHours(this.endTimeHour);
    this.examMangementModel.endTime?.setMinutes(this.endTimeMinute);
  }

  checkNullOrEmptyValue(){
    if(this.isNullOrEmptyString(this.examMangementModel.examTitle) 
    || this.isNullOrEmptyString(this.examMangementModel.examDescription)
  || this.examMangementModel.examParticipantSet.length == 0
  ){
    return true;
  }
  return false;
  }

  
  submit(){

    this.handleCalendarData();
    
    if(this.checkNullOrEmptyValue()){
      this.toastrService.error("Bạn nhập thiếu dữ liệu");
      return;
    }
    this.examManagementService.saveExam(this.examMangementModel).subscribe((res) => {
      console.log(res)
      this.toastrService.success("Tạo bài thi thành công");
    }, 
    (err) => {
      this.toastrService.error("Lỗi server");
    })
    }

  isNullOrEmptyString(value: any){
    if(value == null || value == ''){
      return true;
    } else {
      return false;
    }
  }

  show(){
    console.log(this.durationSecond);
    
  }

  
}
