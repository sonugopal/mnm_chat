


import { HttpClient } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup } from '@angular/forms';
import { SuperadminHomeComponent } from './../superadmin-home/superadmin-home.component';
import { Component, OnInit, Renderer2, ViewChild, ElementRef } from '@angular/core';
import { Location } from '@angular/common';
import { environment } from 'src/environments/environment.prod';
import * as uuid from 'uuid';

@Component({
  selector: 'app-super-admin-chat',
  templateUrl: './super-admin-chat.component.html',
  styleUrls: ['./super-admin-chat.component.scss']
})
export class SuperAdminChatComponent implements OnInit {
  emojiForm:FormGroup
  optionSelect:boolean=false;
  roomId;
  roomName;
  chatList:[];
  socket: any;
  newMessage:any;

  constructor(private location: Location,private home:SuperadminHomeComponent,private route:ActivatedRoute
    ,private http:HttpClient,private renderer: Renderer2,private elRef: ElementRef) { }
    @ViewChild('ul') ul: ElementRef;
  ngOnInit(): void {
   this.roomId=this.route.snapshot.params['id'];
   this.loadChatHistory()
   this.socket.on('receive-message', (data) => {
    if (data) {
      console.log(data)
      const li: HTMLLIElement = this.renderer.createElement('li');
      const div:HTMLDivElement=this.renderer.createElement('div');
     li.innerHTML = data;
     li.style.background = 'white';
     li.style.padding =  '10px 14px';  
     li.style.margin = '10px';
    li.style.borderRadius='9px';
    
     this.renderer.appendChild(this.ul.nativeElement, li)
     
     }
   });
  
   
  }
  loadChatHistory(){
    return this.http.post(environment.apiUrl+'chat/enter-chat-room',{'room_id':this.roomId}).subscribe((body)=>{
      this.roomName=body['room_name'];
      this.chatList=body['chat_list'];

    })
  }
  option(){
    this.optionSelect=!this.optionSelect
  }
  optionClose(){
    this.optionSelect=false;
  }
  cancel() {
   this.home.chatport=true;
    this.location.back(); // <-- go back to previous location on cancel
  }
  addEmoji($event){
    let data = this.emojiForm.get('inputField');
    data.patchValue(data.value + $event.emoji.native)
  }
  sendMessage(){
    var temp_id=uuid.v4();
    let message={
      msg:this.newMessage,
      room_id:this.roomId,
      temp_id:temp_id,
      api_token:sessionStorage.getItem('api_token')
    }
  
    this.home.socket.emit('send-message',message,(response)=>{
      console.log(response)
      let id_change=document.getElementsByClassName(temp_id)
      id_change[0].getElementsByClassName('id-class')[0].innerHTML=response.msg_id;
      let status=id_change[0].getElementsByTagName('img')[0].src="assets/check.svg"
    
      
    });
    const li: HTMLLIElement = this.renderer.createElement('li');
    this.renderer.addClass(li,'li-class' );
    const div:HTMLDivElement=this.renderer.createElement('div');
    this.renderer.addClass(div,temp_id );
    const msg:HTMLParagraphElement=this.renderer.createElement('p');
    this.renderer.addClass(msg,'msg-class' );
    // const name:HTMLParagraphElement=this.renderer.createElement('p');
    // this.renderer.addClass(name,'name-class' );
    const id:HTMLParagraphElement=this.renderer.createElement('p');
    this.renderer.addClass(id,`id-class` );
  
    // const time:HTMLParagraphElement=this.renderer.createElement('p');
    const icon:HTMLImageElement=this.renderer.createElement('img');
    this.renderer.addClass(icon,'status-icon' );
  div.append(msg,id,icon)
    li.append(div)
   msg.innerHTML=this.newMessage;
   id.innerHTML=temp_id;
    icon.src="assets/timer.svg"
    li.style.background = 'white';
 
    li.style.float='right';
    li.style.maxWidth='70%';
   
    li.style.clear='both';
    li.style.padding='10px';
    li.style.borderRadius='10px';
    li.style.marginBottom='5px';
    li.style.marginTop='5px';
    li.style.marginRight='2px';
    li.style.wordWrap='break-word'

    li.style.fontFamily='Helvetica, Arial, sans-serif';
    this.renderer.appendChild(this.ul.nativeElement, li)
    // document.getElementById('message-list').appendChild(element)
    
    this.newMessage = '';
  }
}
