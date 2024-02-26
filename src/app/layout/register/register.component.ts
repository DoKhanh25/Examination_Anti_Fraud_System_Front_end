import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { AuthenticationService } from '../../service/authentication/authentication.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  registerForm = {
    username: '',
    password: ''
  }

  constructor(public router: Router,
    public jwtHelperService: JwtHelperService,
    public authService: AuthenticationService,
    public toastrService: ToastrService
    ){}

  register(){
    this.authService.register(this.registerForm).subscribe(
      (res) => {
        console.log(res)
      },
      (err) => {
        console.log(err)
      }
    )
  }


}
