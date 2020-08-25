


import { environment } from './../../../environments/environment.prod';
import { HttpClient } from '@angular/common/http';
import { AuthenticationService } from './../../_services/authentication.service';
import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { HostListener } from "@angular/core";
import { Admin } from 'src/app/_models/user';
import * as io from 'socket.io-client';

const SOCKET_ENDPOINT='ws://192.168.137.215:3000'
@Component({
  selector: 'app-superadmin-home',
  templateUrl: './superadmin-home.component.html',
  styleUrls: ['./superadmin-home.component.scss']
})
export class SuperadminHomeComponent implements OnInit {
  outer=true;
  show=false;
  screenHeight: number;
    screenWidth: number;
  showFiller = false;
  admin:Admin[]
  public TabIndex = 0;
  chatDetail:any[];
  socket;
  adminLog=true;
  contacts: Object;
  single: Object;
  constructor(private router:Router,
    private AuthenticationService:AuthenticationService,
    private http:HttpClient,
    private cdRef: ChangeDetectorRef,
    
 
    
    ) { this.getScreenSize();
      this.loadChat();
 
      }
optionSelect:boolean=false;
searchShow:boolean=false;
chatport:boolean=true;
  ngOnInit(): void {
    const currentUser =JSON.parse( localStorage.getItem('currentUser'))
    console.log(currentUser)
    let role=currentUser.user.role;
    if(role=='admin'){
      this.adminLog=false;
    }
    
    this.socket = io(SOCKET_ENDPOINT);
    
this.socket.on('receive-message',(data)=>{
  if(data){
    if(this.screenWidth>500){
   const room=document.getElementsByClassName(data.room_id)[0];
   const recent=room.getElementsByClassName('recent-message')[0];
   recent.innerHTML=data.msg.slice(0,10)
  //  const time=room.getElementsByClassName('time')[0];
  //  time.innerHTML=this.getTime(data.time)

    }
  }
})
this.socket.on('new-chat-room',(data)=>{
  this.loadChat()
})

   
   
   
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
  sessionStorage.clear()
  
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
  loadChat(){
  
    return this.http.post<any>(environment.apiUrl+'chat/get-chat-rooms',null).subscribe((body)=>{
      this.chatDetail=body;
     console.log(this.chatDetail);
     
     this.cdRef.detectChanges();
      this.chatDetail.forEach((room)=>{
        this.socket.emit('join', room.room_id);
       
      })
     
    })


  }


  showAll(){
    this.chatport=false;
    this.show=true;
    return this.http.post(environment.apiUrl+'user/get-all-members',null).subscribe((body)=>{
      this.contacts=body;
      console.log(this.contacts)
      this.cdRef.detectChanges();
    })
  }
 
showChat(){
  this.loadChat()
  this.chatport =true;
  this.show=false
}
singleChat(e){

  let param={
   "user_id":e
  }
  return this.http.post(environment.apiUrl+'chat/get-personal-chat',param).subscribe((res)=>{
    this.single=res;
 
    this.router.navigateByUrl('superadmin/chat/'+this.single)
    // this.cdRef.detectChanges();
  })
 
}
}


