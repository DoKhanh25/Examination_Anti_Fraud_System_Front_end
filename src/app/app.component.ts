import { Component, OnInit  } from '@angular/core';
import { LayoutService } from './service/layout/layout.service';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit{
  title = 'Hyperledger';
  isLoginPage: any;
  constructor(public layoutService: LayoutService, public routerService: Router){
    
  }

  ngOnInit(): void {
    this.routerService.events.subscribe((event: any) => {
      if (event instanceof NavigationEnd) {
        this.checkLoginRoute(event.url);
      }
    });
  }

  checkLoginRoute(url: string) {
    this.isLoginPage = (url === '/login' || url === '/register');
  }
  
  


}
