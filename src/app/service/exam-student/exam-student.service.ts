import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ResultModel } from '../../model/result.model';

@Injectable({
  providedIn: 'root'
})
export class ExamStudentService {
  baseUrl = "http://localhost:8080/api/user";
  constructor(public httpClient: HttpClient) { }

  postExamFinishTime(examParticipant: any){
    return this.httpClient.post<ResultModel>(`${this.baseUrl}/postExamFinishTime`, examParticipant);
  }
  
  getExamDetail(examParticipant: any){
    return this.httpClient.post<ResultModel>(`${this.baseUrl}/getExamDetail`, examParticipant);
  }

  postExamSolution(examSolutionDTO: any){
    return this.httpClient.post<ResultModel>(`${this.baseUrl}/postExamSolution`, examSolutionDTO);
  }
}
