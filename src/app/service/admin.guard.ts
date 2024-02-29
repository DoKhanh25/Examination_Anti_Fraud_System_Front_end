import { Router } from "@angular/router";
import { ToastrService } from 'ngx-toastr';
import { Injectable } from '@angular/core';
import { AuthenticationService } from "./authentication/authentication.service";
import { Observable, BehaviorSubject } from 'rxjs';
import { UrlTree } from "@angular/router";

@Injectable({
    providedIn: 'root'
})

export class AdminGuard {
    constructor(private authService: AuthenticationService, private toastr: ToastrService, private router: Router) { 

    }

    canActivate():
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    let role = localStorage.getItem('role');
    if (role != '2') {
      this.toastr.info("Bạn không thể truy cập trang này");
      this.router.navigate(['/blank-page']);
      return false;
    }
    return true;
  }

    

}