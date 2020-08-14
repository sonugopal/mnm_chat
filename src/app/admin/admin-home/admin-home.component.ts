import { HttpClient } from '@angular/common/http';
import { AuthenticationService } from './../../_services/authentication.service';
import { Component, OnInit, HostListener } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment.prod';
import * as io from 'socket.io-client';

const SOCKET_ENDPOINT='ws://192.168.43.107:5000/'
@Component({
  selector: 'app-admin-home',
  templateUrl: './admin-home.component.html',
  styleUrls: ['./admin-home.component.scss']
})
export class AdminHomeComponent implements OnInit {
  chatDetail:any[];
  screenHeight: number;
  screenWidth: number;
  showFiller = false;
  constructor(private router:Router,private AuthenticationService:AuthenticationService,private http:HttpClient) {this.getScreenSize(),this.loadChat() }
optionSelect:boolean=false;
searchShow:boolean=false;
chatport:boolean=true;
socket;

  ngOnInit(): void {
    this.socket = io(SOCKET_ENDPOINT);
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
  loadChat(){
    var currentUser =JSON.parse( localStorage.getItem('currentUser'))
    console.log(currentUser.api_token)
    return this.http.post<any>(environment.apiUrl+'chat/get-chat-rooms',currentUser.api_token).subscribe((body)=>{
      this.chatDetail=body;
    
      this.chatDetail.forEach((room)=>{
        this.socket.emit('join', room.room_id);
        this.socket.emit('message',{msg:'hy',room:room.room_id})
        this.socket.on('receive-message',(msg)=>{
          console.log(msg)
        })
       
       
      })

    })


  }

}
