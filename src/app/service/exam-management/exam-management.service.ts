import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ResultModel } from '../../model/result.model';
import { ExamProblemModel } from '../../model/examManagement.model';

@Injectable({
  providedIn: 'root'
})
export class ExamManagementService {

  baseUrl = 'http://localhost:8080'
  constructor(public httpClient: HttpClient) { }

  getStudentAccounts(): Observable<ResultModel>{
    return this.httpClient.get<ResultModel>(`${this.baseUrl}/api/admin/account/getAccounts`);
  }

  saveExam(obj: ExamProblemModel): Observable<ResultModel> {
    return this.httpClient.post<ResultModel>(`${this.baseUrl}/api/admin/saveExamProblem`, obj);
  }
}
