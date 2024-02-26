import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LayoutService {
  isActiveSideBar: boolean = true;

  toggleSideBar(){
    this.isActiveSideBar = !this.isActiveSideBar;
    return this.isActiveSideBar;
  }
 
  

}
