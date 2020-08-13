

import { environment } from './../../../environments/environment.prod';
import { HttpClient } from '@angular/common/http';
import { AuthenticationService } from './../../_services/authentication.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { HostListener } from "@angular/core";
import { Admin } from 'src/app/_models/user';

@Component({
  selector: 'app-superadmin-home',
  templateUrl: './superadmin-home.component.html',
  styleUrls: ['./superadmin-home.component.scss']
})
export class SuperadminHomeComponent implements OnInit {
  screenHeight: number;
    screenWidth: number;
  showFiller = false;
  admin:Admin[]
  public TabIndex = 0;
  constructor(private router:Router,
    private AuthenticationService:AuthenticationService,
    private http:HttpClient,
    
 
    
    ) { this.getScreenSize();
 
      }
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
    this.chatport=true
  }
  
}

fnSearchShow(){
  this.searchShow=!this.searchShow;
}
logout(){
  this.AuthenticationService.logout();
  this.router.navigateByUrl('/login')
  
}
getAdmin(index:number){
this.router.navigateByUrl('/superadmin')
  // const currentUser =JSON.parse( localStorage.getItem('currentUser'))
  // let params={
  //   "api_token":currentUser.api_token
  // }
  return this.http.get<Admin[]>(environment.apiUrl+'user/super/list-admins').subscribe((data)=>{
    this.admin=data['admins'];
    console.log(this.admin)
  })
  }
  getChat(){
    this.router.navigateByUrl('/superadmin')
  }
  getAdminProfile(){
    // this.router.navigateByUrl('/', {skipLocationChange: true}).then(()=>
     this.router.navigate(["/superadmin/adminview/{{admin.user_id}}"])
// );
  }
  
 

}


