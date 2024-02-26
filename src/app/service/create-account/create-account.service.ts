import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {ResultModel} from "../../model/result.model";

@Injectable({
  providedIn: 'root'
})
export class CreateAccountService {
  baseUrl = 'http://localhost:8080'
  constructor(public httpClient: HttpClient) { }

  postExam(obj: any): Observable<ResultModel>{
    return this.httpClient.post<ResultModel>(`${this.baseUrl}/api/authentication/postExam`, obj);
  }


}
