import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ResultModel } from '../model/result.model';
import moment from 'moment';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-exam-detail',
  templateUrl: './exam-detail.component.html',
  styleUrl: './exam-detail.component.css'
})
export class ExamDetailComponent implements OnInit{
  examParticipant = {
    examId: "",
    username: ""
  }

  grade: number = 0;
  data: any;

  studentName: string = ""

  textAreaForm: any;

  constructor(public router: Router, 
    public fb: FormBuilder, 
    public activateRouter: ActivatedRoute, 
    public httpClient: HttpClient,
    public toastrService: ToastrService) {
      
    this.textAreaForm = fb.group({
      textArea: ""
    })
  }

  examTimeCalculate(){
    let submitTime = this.data.submitTime;
    return moment(submitTime).format('YYYY-MM-DD HH:mm');
  }

  ngOnInit(): void {
     this.examParticipant.examId = this.activateRouter.snapshot.params['id'];
     this.examParticipant.username = this.activateRouter.snapshot.params['studentUsername'];
     this.httpClient.post<ResultModel>(`http://localhost:8080/api/admin/getExamSolution`, this.examParticipant).subscribe((res) => {
        this.data = res.data;
        this.grade = this.data.grade;
        
        this.textAreaForm.setValue({
          textArea: res.data.examSolution
        })
  })
  }
  onSubmit(){
    this.httpClient.post<ResultModel>(`http://localhost:8080/api/admin/postGrade`, {
      examId: this.examParticipant.examId,
      username: this.examParticipant.username,
      grade: this.grade
    }).subscribe(
      (res) => {
        if(res.errorCode === "0"){
          this.toastrService.success("Đã cập nhật điểm thành công")
        }
        if(res.errorCode === "-1"){
          this.toastrService.error("Bạn đã nhập điểm")
        }
    },
      (error) => {
        this.toastrService.error("Lỗi server")
      }
      )
  }

}
