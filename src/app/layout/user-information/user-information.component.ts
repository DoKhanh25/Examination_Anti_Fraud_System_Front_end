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
  haveData: any;
  passwordForm = {
    currentPassword: "",
    newPassword: "",
    renewPassword: ""
  }

  userInfor: InformationModel = {
    fullname: "",
    organization: "",
    job: "",
    address: "",
    email: "",
    birthday: undefined,
    avatar: ""
  }





  constructor(public userInformationService: UserInfoService,
    public toastService: ToastrService,
    public authenticationService: AuthenticationService
  ){

  }
  ngOnInit(): void {
    this.userInformationService.getInformation().subscribe(
      (res) => {
        if(res.errorCode == "-1"){
          this.isActive = 2;
          this.haveData = false;
          this.userInfor.birthday = new Date();
          this.toastService.info("Bạn chưa có thông tin cá nhân")
        }
        if(res.errorCode == "0"){
          this.haveData = true;
          this.userInfor = res.data
          this.userInfor.birthday = new Date(res.data.birthday)
        }
      },
      (err) => {
        console.log(err)
      }
    )
  }

  createOrUpdateInfo(){
    if(this.haveData == false){
      this.userInformationService.createInformation(this.userInfor).subscribe(
        (res) => {
          if(res.errorCode == "0"){
            this.toastService.success("Tạo mới thông tin thành công");
            this.callBack()
          }
          if(res.errorCode == "3"){
            this.toastService.error(res.message);
            this.callBack()
          }
        }
      )
    }
    if(this.haveData == true){
      this.userInformationService.updateInformation(this.userInfor).subscribe(
        (res) => {
          if(res.errorCode == "0"){
            this.toastService.success("Sửa thông tin thành công");
            this.callBack()
          }
          if(res.errorCode == "3"){
            this.toastService.error(res.message);
            this.callBack()
          }

        }
      )
    }
  }
  changePassword(){
    if(this.passwordForm.currentPassword == null || this.passwordForm.newPassword == null){
      this.toastService.info("Bạn chưa nhập mật khẩu");
      return;
    }
    if(this.passwordForm.newPassword != this.passwordForm.renewPassword){
      this.toastService.info("Mật khẩu mới không khớp");
      return;
    }
    this.authenticationService.changePassword(this.passwordForm).subscribe(
      (res) => {
        if(res.errorCode == "0"){
          this.toastService.info(res.message);
          this.passwordForm = {
            currentPassword: "",
            newPassword: "",
            renewPassword: ""
          }
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
