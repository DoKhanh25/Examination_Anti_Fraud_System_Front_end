import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { ResultModel } from '../../model/result.model';
import { ToastrService } from 'ngx-toastr';
import { jwtDecode } from 'jwt-decode';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  baseUrl = 'http://localhost:8080';

  isAuthenticated$ = new BehaviorSubject<boolean>(this.isAuthenticated());
  roleCode$ = new BehaviorSubject<any>(this.role);


  constructor(private httpClient: HttpClient,
    private jwtHelperService: JwtHelperService,
    private toastrService: ToastrService,
    public router: Router
    ) {
  }

  
  getSampleAccountFile(){
    return this.httpClient.get(`${this.baseUrl}/api/admin/account/sampleAccountFile`, {responseType: 'blob'});
  }


  loginRequest(object: any): Observable<ResultModel> {
     return this.httpClient.post<any>(`${this.baseUrl}/api/authentication/login`, object)
  }

  registerRequest(object: any) : Observable<ResultModel> {
    return this.httpClient.post<ResultModel>(`${this.baseUrl}/api/authentication/register`, object)
  }
  login(loginForm: any){
    return new Observable((observer) => {
      const authState = {
        accountDetail: false,
        tokenCache: false
      }

      const authCallBack = (res: any) => {
        if(authState.accountDetail && authState.tokenCache){
          this.isAuthenticated$.next(true);
          this.roleCode$.next(this.role);
          observer.next(res);
          observer.complete();
        }
      }
      const onError = (err: any) => {
        this.toastrService.error(err)
        observer.error(err);
        observer.complete();
      }

      this.loginRequest(loginForm).subscribe((response: ResultModel) => {
                if(response.errorCode == "0"){
                  localStorage.setItem('auth_token', response.data.authToken);
                  localStorage.setItem('isAuthenticated', 'true');
                  localStorage.setItem('username', response.data.username);
                  localStorage.setItem('role', response.data.role);
                  localStorage.setItem('msv', response.data.msv);
                  authState.tokenCache = true;
                  authState.accountDetail = true;

                  authCallBack(response)

                  this.toastrService.success(response.message, "Thành Công");
                  this.router.navigate(['/home']);
                }
                if(response.errorCode == "-1"){
                  authState.accountDetail = false;
                  authState.tokenCache = false;
                  this.toastrService.error("Đăng nhập thất bại");
                  authCallBack(response)
          }
        },
        (error) => {
          this.toastrService.error("Đăng nhập không thành công")
        }
      )
    })
  }


  register(registerForm: any){
    return new Observable((observer) => {
      const authState = {
        accountDetail: false,
        tokenCache: false
      }

      const authCallBack = (res: any) => {
        if(authState.accountDetail && authState.tokenCache){
          this.isAuthenticated$.next(true);
          this.roleCode$.next(this.role);
          observer.next(res);
          observer.complete();
        }
      }
      const onError = (err: any) => {
        this.toastrService.error(err)
        observer.error(err);
        observer.complete();
      }

      this.registerRequest(registerForm).subscribe((response: ResultModel) => {
                if(response.errorCode == "0"){
                  localStorage.setItem('auth_token', response.data);
                  localStorage.setItem('isAuthenticated', 'true');
                  localStorage.setItem('username', response.data.username);
                  localStorage.setItem('role', response.data.role)
                  authState.tokenCache = true;
                  authState.accountDetail = true;

                  authCallBack(response)

                  this.toastrService.success(response.message, "Thành Công");
                  this.router.navigate(['/home']);
                }
                if(response.errorCode == "3"){
                  authState.accountDetail = false;
                  authState.tokenCache = false;
                  this.toastrService.info(response.message, "Thất bại");
                  authCallBack(response)
          }
        },
        (error) => {
          onError(error);
        }
      )
    })
  }

  createAccount(registerForm: any): Observable<ResultModel>{
    return this.httpClient.post<ResultModel>(`${this.baseUrl}/api/authentication/register`, registerForm);
  }

  changePassword(form: any): Observable<ResultModel>{
    return this.httpClient.post<ResultModel>(`${this.baseUrl}/api/authentication/changePassword`, form)
  }


  logout(){
    localStorage.clear();
    this.isAuthenticated$.next(false);
    this.roleCode$.next(null);
  }



  isAuthenticated(): boolean{
    return this.authToken != null && !this.jwtHelperService.isTokenExpired(this.authToken);
  }

  get authToken(): any{
    return localStorage.getItem('auth_token');
  }
  get role(){
    return localStorage.getItem('role');
  }
  get username(){
    return localStorage.getItem('username');
  }
}

