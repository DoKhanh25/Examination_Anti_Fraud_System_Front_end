import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { ResultModel } from '../model/result.model';
import moment from 'moment';
import { Router } from '@angular/router';

@Component({
  selector: 'app-exam-student-list',
  templateUrl: './exam-student-list.component.html',
  styleUrl: './exam-student-list.component.css'
})
export class ExamStudentListComponent implements OnInit{
  dateFormat = "YYYY-MM-DD HH:mm";
  tableData: any[] = [];
  username: string = "";
  constructor(public httpClient: HttpClient, public toastrService: ToastrService, public router: Router){

  }

  ngOnInit(): void {
    this.username = localStorage.getItem("username") || "";
    if(this.username == "") return;
    this.httpClient.get<ResultModel>(`http://localhost:8080/api/user/getExamProblem/${this.username}`)
    .subscribe(
      (res) => {
      this.tableData = res.data;
    },
    (err) => {
      this.toastrService.error("Lỗi server");
    }
    )
  }


  convertDateFormat(originalDate: any){
    return moment(originalDate).format(this.dateFormat);
  }

  secondsToMinutesSeconds(seconds: number) {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes} phút : ${remainingSeconds < 10 ? '0' : ''}${remainingSeconds} giây`;
}

  getTestStatus(startTime: any, endTime: any) {
    const startDate = new Date(startTime);
    const endDate  = new Date(endTime);
    const currentTime = new Date();
    console.log(currentTime);
    if (currentTime.getTime() < startDate.getTime()) {
      return "Chưa đến thời gian";
    } else if (currentTime.getTime() > endDate.getTime()) {
      return "Hết hạn";
    }  else  {  
      return "Đang trong quá trình";
    } 
  }

  routeToExamDetail(examId: string){
    this.router.navigate([`/exam-detail/${examId}`]);
  }
  

}
