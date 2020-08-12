import { AuthenticationService } from './../../_services/authentication.service';
import { Component, OnInit, HostListener } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-home',
  templateUrl: './admin-home.component.html',
  styleUrls: ['./admin-home.component.scss']
})
export class AdminHomeComponent implements OnInit {
  screenHeight: number;
  screenWidth: number;
  showFiller = false;
  constructor(private router:Router,private AuthenticationService:AuthenticationService) {this.getScreenSize(); }
optionSelect:boolean=false;
searchShow:boolean=false;
chatport:boolean=true;

  ngOnInit(): void {
  }
  @HostListener('window:resize', ['$event'])
  getScreenSize(event?) {
        this.screenHeight = window.innerHeight;
        this.screenWidth = window.innerWidth;
        console.log(this.screenHeight, this.screenWidth);
  }
  option(){
    this.optionSelect=!this.optionSelect
  }
  optionClose(){
    this.optionSelect=false;
  }
  mobileView(){
    if(this.screenWidth<500){
      this.chatport=false;
      
    }
    else{
      this.chatport=true;
      
    }
    
  }
  fnSearchShow(){
    this.searchShow=!this.searchShow;
  }
  logout(){
    this.AuthenticationService.logout();
    this.router.navigateByUrl('/login')
    
  }

}
