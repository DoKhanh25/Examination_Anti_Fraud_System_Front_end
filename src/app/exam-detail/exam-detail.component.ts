import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ResultModel } from '../model/result.model';

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
  data: any

  textAreaForm: any;

  constructor(public router: Router, public fb: FormBuilder, public activateRouter: ActivatedRoute, public httpClient: HttpClient) {
    this.textAreaForm = fb.group({
      textArea: ""
    })
  }

  ngOnInit(): void {
     this.examParticipant.examId = this.activateRouter.snapshot.params['id'];
     this.examParticipant.username = this.activateRouter.snapshot.params['studentUsername'];
     this.httpClient.post<ResultModel>(`http://localhost:8080/api/admin/getExamSolution`, this.examParticipant).subscribe((res) => {
        this.data = res.data;
        
        
        this.textAreaForm.setValue({
          textArea: res.data.examSolution
        })
  })
  }

}
