
import { Router } from "@angular/router";
import { ToastrService } from 'ngx-toastr';
import { Injectable } from '@angular/core';
import { AuthenticationService } from "./authentication/authentication.service";
import { Observable, BehaviorSubject } from 'rxjs';
import { UrlTree } from "@angular/router";

@Injectable({
    providedIn: 'root'
  })
  export class AuthGuard {
  
    constructor(private authService: AuthenticationService, private toastr: ToastrService, private router: Router) { }
    
    canActivate():
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    if (!this.authService.isAuthenticated$.value) {
      this.toastr.info("Bạn chưa đăng nhập");
      this.router.navigate(['/login']);
      return false;
    }
    return true;
  }
}