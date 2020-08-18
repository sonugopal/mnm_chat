


import { HttpClient } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup } from '@angular/forms';
import { SuperadminHomeComponent } from './../superadmin-home/superadmin-home.component';
import { Component, OnInit, Renderer2, ViewChild, ElementRef, ɵConsole, AfterViewChecked } from '@angular/core';
import { Location } from '@angular/common';
import { environment } from 'src/environments/environment.prod';
import * as uuid from 'uuid';

@Component({
  selector: 'app-super-admin-chat',
  templateUrl: './super-admin-chat.component.html',
  styleUrls: ['./super-admin-chat.component.scss']
})
export class SuperAdminChatComponent implements OnInit,AfterViewChecked  {
  emojiForm:FormGroup
  optionSelect:boolean=false;
  roomId;
  roomName;
  chatList=[];
  socket: any;
  newMessage:any;

  constructor(private location: Location,private home:SuperadminHomeComponent,private route:ActivatedRoute
    ,private http:HttpClient,private renderer: Renderer2,private elRef: ElementRef) { }
  ngAfterViewChecked(): void {
    this.scrollToBottom();
  }
    @ViewChild('ul') ul: ElementRef;
    @ViewChild('scrollMe') private myScrollContainer: ElementRef;
    // @ViewChild('scrollMe') private myScrollContainer: ElementRef;
  ngOnInit(): void {
    console.log(sessionStorage.getItem('api_token'))
   this.roomId=this.route.snapshot.params['id'];
   this.loadChatHistory()
   this.home.socket.on('receive-message', (data) => {
     console.log(data)
    if (data) {
      if(data.room_id==this.roomId){
        if(data.from!==sessionStorage.getItem('user_id')){
          const li: HTMLLIElement = this.renderer.createElement('li');
          this.renderer.addClass(li,'li-class' );
          const div:HTMLDivElement=this.renderer.createElement('div');
          this.renderer.addClass(div,data.msg_id );
          const msg:HTMLParagraphElement=this.renderer.createElement('p');
          this.renderer.addClass(msg,'msg-class' );
          // const name:HTMLParagraphElement=this.renderer.createElement('p');
      // this.renderer.addClass(name,'name-class' );
          const id:HTMLParagraphElement=this.renderer.createElement('p');
          this.renderer.addClass(id,`id-class` );
          const icon:HTMLImageElement=this.renderer.createElement('img');
          this.renderer.addClass(icon,'status-icon' );
          div.append(msg,id,icon)
          li.append(div)
        msg.innerHTML=data.msg;
        id.innerHTML=data.msg_id;
        li.style.background = 'white';
      
    
   
      
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

        }
       

      }
   
     
     }
   });
  
   
  }
  loadChatHistory(){
    return this.http.post(environment.apiUrl+'chat/enter-chat-room',{'room_id':this.roomId}).subscribe((body)=>{
      this.roomName=body['room_name'];
      this.chatList=body['chat_list'];
      this.chatList.forEach((chat)=>{
        console.log(chat)
        const li: HTMLLIElement = this.renderer.createElement('li');
        this.renderer.addClass(li,'li-class' );
        const div:HTMLDivElement=this.renderer.createElement('div');
        this.renderer.addClass(div,chat.msg_id );
        const msg:HTMLParagraphElement=this.renderer.createElement('p');
        this.renderer.addClass(msg,'msg-class' );
        // const name:HTMLParagraphElement=this.renderer.createElement('p');
    // this.renderer.addClass(name,'name-class' );
        const id:HTMLParagraphElement=this.renderer.createElement('p');
        this.renderer.addClass(id,`id-class` );
        const icon:HTMLImageElement=this.renderer.createElement('img');
        this.renderer.addClass(icon,'status-icon' );
        div.append(msg,id,icon)
        li.append(div)
      msg.innerHTML=chat.msg;
      id.innerHTML=chat.msg_id;
      li.style.background = 'white';
      console.log(chat.from)
      console.log(sessionStorage.getItem('user_id'))
      if(chat.from==sessionStorage.getItem('user_id')){
        li.style.float='right';
      }
      else{
        li.style.float='left';
      }
 
    
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
   
      })

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
  sendMessage(event){
    
    var temp_id=uuid.v4();
    let message={
      msg:this.newMessage,
      room_id:this.roomId,
      temp_id:temp_id,
      user_id:sessionStorage.getItem('user_id')
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
    const flex:HTMLDivElement=this.renderer.createElement('div');
    this.renderer.addClass(flex,'flex-time');
    const id:HTMLParagraphElement=this.renderer.createElement('p');
    this.renderer.addClass(id,`id-class` );
  
    // const time:HTMLParagraphElement=this.renderer.createElement('p');
    const icon:HTMLImageElement=this.renderer.createElement('img');
    this.renderer.addClass(icon,'status-icon' );
    flex.append(icon)
  div.append(msg,id,flex)
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
    this.renderer.appendChild(this.ul.nativeElement, li);
    this.scrollToBottom();
    // var objDiv=document.getElementsByClassName('chat-conntainer')[0];
    // objDiv.scrollTop=objDiv.scrollHeight
    // document.getElementById('message-list').appendChild(element)
    
    this.newMessage = '';
  }
  scrollToBottom(): void {
    try {
        this.myScrollContainer.nativeElement.scrollTop = this.myScrollContainer.nativeElement.scrollHeight;
    } catch(err) { }                 
}
}
