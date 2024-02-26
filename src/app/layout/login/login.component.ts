import { Component, OnDestroy, OnInit } from '@angular/core';
import { LayoutService } from '../../service/layout/layout.service';
import { AuthenticationService } from '../../service/authentication/authentication.service';
import { LoginModel } from '../../model/login.model';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent{
  loginForm: LoginModel = {
    username: '',
    password: ''
  }
  constructor(
    public layoutService: LayoutService, 
    public authenticationService: AuthenticationService,
    public toastrService: ToastrService,
    public router: Router
){

    }

  onLoginClick(){
    if(!this.validate()) return;
   this.authenticationService.login(this.loginForm).subscribe((res) => {
    console.log(res)
   },
   (err) => {
    console.log(err)
   });
  }

  validate(){
    if(this.loginForm.password == "" || this.loginForm.password == null
    || this.loginForm.username == "" || this.loginForm.password == null){
      this.toastrService.error("Bạn chưa nhập thông tin");
      return false;
    }
    return true;

  }



}
