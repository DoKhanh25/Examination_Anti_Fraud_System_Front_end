import { Component } from '@angular/core';
import { AuthenticationService } from '../service/authentication/authentication.service';
import { ToastrService } from 'ngx-toastr';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-account-management',
  templateUrl: './account-management.component.html',
  styleUrl: './account-management.component.css'
})
export class AccountManagementComponent {
  selectedFile: File | null = null;

  registerForm = {
    username: '',
    password: '',
    name: ''
  }

  constructor(public authService: AuthenticationService,
    public toastrService: ToastrService,
    public httpClient: HttpClient
  
    ){}

  resetInformation(){
    this.registerForm.name = "";
    this.registerForm.username = "";
    this.registerForm.password = "";

  }

  getSampleAccountFile(){
    this.authService.getSampleAccountFile().subscribe((res) => {
      const downloadLink = document.createElement('a');
      const fileURL = URL.createObjectURL(res);
      downloadLink.href = fileURL;
      downloadLink.download = 'download.xlsx'; // Đặt tên file tại đây
      downloadLink.click();    
    },
    (err) => {
      this.toastrService.error("Lỗi server")
    }
    )
  }

  register(){
    this.authService.createAccount(this.registerForm).subscribe(
      (res) => {
        if( res.errorCode == "-1")   {
          this.toastrService.error(res.message);
        }     
        if(res.errorCode == "0"){
          this.toastrService.info("Tạo tài khoản thành công")
          this.resetInformation()

        }
      },
      (err) => {
        this.toastrService.error("Lỗi server");

      }
    )
  }

  uploadAccountFile(){
    if (this.selectedFile) {
      const formData = new FormData();
      formData.append('file', this.selectedFile);

      this.httpClient.post('http://localhost:8080/api/authentication/uploadAccountFile', formData)
        .subscribe(() => {
          console.log('File uploaded successfully!');
          // Xử lý thành công sau khi tải lên
        }, (error) => {
          console.error('Error uploading file:', error);
          // Xử lý lỗi khi tải lên
        });
    }
  }

  onFileSelected(event: any): void {
    this.selectedFile = event.target.files[0];
  }
}
