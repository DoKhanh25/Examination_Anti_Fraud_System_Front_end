import { Component, OnChanges, OnInit } from '@angular/core';
import { UserInfoService } from '../../service/information/user-info.service';
import { ToastrService } from 'ngx-toastr';
import { InformationModel } from '../../model/information.model';
import { AuthenticationService } from '../../service/authentication/authentication.service';
@Component({
  selector: 'app-user-information',
  templateUrl: './user-information.component.html',
  styleUrl: './user-information.component.css'
})
export class UserInformationComponent implements OnInit{
  isActive: any
  passwordForm = {
    currentPassword: "",
    newPassword: "",
    username: ""
  }

  username: any;


  constructor(public userInformationService: UserInfoService,
    public toastService: ToastrService,
    public authenticationService: AuthenticationService
  ){

  }
  ngOnInit(): void {
    this.username = localStorage.getItem("username");
    this.passwordForm.username = this.username.toString();

  }

  changePassword(){
    if(this.passwordForm.currentPassword == null || this.passwordForm.newPassword == null){
      this.toastService.info("Bạn chưa nhập mật khẩu");
      return;
    }
    this.authenticationService.changePassword(this.passwordForm).subscribe(
      (res) => {
        if(res.errorCode == "0"){
          this.toastService.info(res.message);
          this.passwordForm.currentPassword = "";
          this.passwordForm.newPassword = "";
          return;
        }
        if(res.errorCode =="3"){
          this.toastService.info(res.message);
        }
      },
      (err) => {
        console.log(err);

      }

    )

  }
  callBack(){
    this.ngOnInit();
  }

}
