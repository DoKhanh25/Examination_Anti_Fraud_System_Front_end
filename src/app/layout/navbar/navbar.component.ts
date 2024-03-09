import { Component, Output, EventEmitter, OnInit } from '@angular/core';
import { LayoutService } from '../../service/layout/layout.service';
import { AuthenticationService } from '../../service/authentication/authentication.service';
import { UserInfoService } from '../../service/information/user-info.service';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent implements OnInit{
  username: string | null = "";
  avatar: any = "assets/avatar_user.png"
  searchQuery: any;

  constructor(public layoutService: LayoutService, public authenService: AuthenticationService, ){

  }
  ngOnInit(): void {
    this.username = localStorage.getItem('username') != null ? localStorage.getItem('username') : 'Người dùng';
  }
  
  logout(){
    this.authenService.logout();
  }


  sideBarToggle(){
   this.layoutService.toggleSideBar();
  }

}
