import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrl: './side-bar.component.css'
})
export class SideBarComponent implements OnInit{


  userRole: string|null;

  constructor() {
    this.userRole = localStorage.getItem("role");
  }
  ngOnInit() {
  }
}
