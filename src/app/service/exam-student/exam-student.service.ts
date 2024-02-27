import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ResultModel } from '../../model/result.model';

@Injectable({
  providedIn: 'root'
})
export class ExamStudentService {
  baseUrl = "http://localhost:8080/api";
  constructor(public httpClient: HttpClient) { }

  postExamFinishTime(examParticipant: any){
    return this.httpClient.post<ResultModel>(`${this.baseUrl}/admin/postExamFinishTime`, examParticipant);
  }
  
  getExamDetail(examParticipant: any){
    return this.httpClient.post<ResultModel>(`${this.baseUrl}/admin/getExamDetail`, examParticipant);
  }

  postExamSolution(examSolutionDTO: any){
    return this.httpClient.post<ResultModel>(`${this.baseUrl}/admin/postExamSolution`, examSolutionDTO);
  }
}
