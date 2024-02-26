import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ResultModel } from '../../model/result.model';

@Injectable({
  providedIn: 'root'
})
export class UserInfoService {
  baseUrl = 'http://localhost:5000/api/v1';

  constructor(public httpClient: HttpClient) { }


  getInformation(): Observable<ResultModel>{
    return this.httpClient.get<ResultModel>(`${this.baseUrl}/info`);
  }

  createInformation(object: any): Observable<ResultModel>{
    return this.httpClient.post<ResultModel>(`${this.baseUrl}/info`, object);
  }

  updateInformation(object: any): Observable<ResultModel>{
    return this.httpClient.put<ResultModel>(`${this.baseUrl}/info`, object);
  }

  
}
