import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import moment from 'moment';
import { ResultModel } from '../model/result.model';
import { Router } from '@angular/router';
@Component({
  selector: 'app-exam-management-list',
  templateUrl: './exam-management-list.component.html',
  styleUrl: './exam-management-list.component.css'
})
export class ExamManagementListComponent implements OnInit{

  dateFormat = "YYYY-MM-DD HH:mm:ss";

  tableData: any[] = [];
  constructor(public httpClient: HttpClient, public router: Router) {
    
  }
  ngOnInit(): void {
    this.httpClient.get<ResultModel>('http://localhost:8080/api/admin/getAllExamProblem').subscribe((res) => {
      this.tableData = res.data;
    })
  }


  convertDateFormat(originalDate: any){
    return moment(originalDate).format(this.dateFormat);
  }

  secondsToMinutesSeconds(seconds: number) {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
  }
  navigateToExamDetail(examId: number, studentUsername: string){
    this.router.navigate(['/examDetail', examId, studentUsername]);
  }

 
  
}


