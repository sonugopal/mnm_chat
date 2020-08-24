


import { HttpClient } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup } from '@angular/forms';
import { SuperadminHomeComponent } from './../superadmin-home/superadmin-home.component';
import { Component, OnInit, Renderer2, ViewChild, ElementRef, ɵConsole, AfterViewChecked, NgZone } from '@angular/core';
import { Location } from '@angular/common';
import { environment } from 'src/environments/environment.prod';
import * as uuid from 'uuid';
import { CdkTextareaAutosize } from '@angular/cdk/text-field/autosize';
import { take } from 'rxjs/operators';

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
    ,private http:HttpClient,private renderer: Renderer2,private elRef: ElementRef,private _ngZone: NgZone) { }
    @ViewChild('autosize') autosize: CdkTextareaAutosize;
  ngAfterViewChecked(): void {
    this.scrollToBottom();
  }
    @ViewChild('ul') ul: ElementRef;
    @ViewChild('scrollMe') private myScrollContainer: ElementRef;
    // @ViewChild('scrollMe') private myScrollContainer: ElementRef;
  ngOnInit(): void {
    let audio = new Audio();
      
    audio.src = "assets/notify.mp3";
    audio.load();
    console.log(sessionStorage.getItem('api_token'))
   this.roomId=this.route.snapshot.params['id'];
   this.loadChatHistory()
   this.home.socket.on('receive-message', (data) => {
     console.log(data)
    if (data) {
      if(data.room_id==this.roomId){
        // if(data.type="admin"){
        //   const admin_msg:HTMLLIElement = this.renderer.createElement('li');
        //   this.renderer.addClass(admin_msg,'admin-message' );
        //   admin_msg.innerHTML=data.msg
        // }
        // else{
       
        
     
        if(data.from!==sessionStorage.getItem('user_id')){
          
          const li: HTMLLIElement = this.renderer.createElement('li');
          this.renderer.addClass(li,'receive-msg-list' );
          const div:HTMLDivElement=this.renderer.createElement('div');
          this.renderer.addClass(div,data.msg_id );
          const name:HTMLParagraphElement=this.renderer.createElement('p');
          this.renderer.addClass(name,'receive-msg-name');
          const msg:HTMLParagraphElement=this.renderer.createElement('p');
          this.renderer.addClass(msg,'receive-msg-class' );
          // const name:HTMLParagraphElement=this.renderer.createElement('p');
      // this.renderer.addClass(name,'name-class' );
          const id:HTMLParagraphElement=this.renderer.createElement('p');
          this.renderer.addClass(id,`receive-msg-id` );
          const flex:HTMLDivElement=this.renderer.createElement('div');
          this.renderer.addClass(flex,'receive-msg-flex')
          const time:HTMLParagraphElement=this.renderer.createElement('p');
          this.renderer.addClass(time,'receive-msg-time');
          const icon=this.renderer.createElement('mat-icon');
          if(data.status=="delivered"){
            this.renderer.appendChild(icon, this.renderer.createText('done_all'));
          }
          else{
            this.renderer.appendChild(icon, this.renderer.createText('done'));
          }
        
        
          
          this.renderer.addClass(icon, 'mat-icon');
        this.renderer.addClass(icon, 'material-icons');
          this.renderer.addClass(icon,'receive-msg-status-icon' );
          flex.append(time,icon)
          div.append(name,msg,id,flex)
          li.append(div)
        msg.innerHTML=data.msg;
        id.innerHTML=data.msg_id;
        name.innerHTML=data.user;
        name.style.color="orangered";
        time.innerHTML=this.msgTime(data.time);
      //   li.style.background = 'white';
      
    
   
      
      // li.style.maxWidth='70%';
     
      // li.style.clear='both';
      // li.style.padding='10px';
      // li.style.borderRadius='10px';
      // li.style.marginBottom='5px';
      // li.style.marginTop='5px';
      // li.style.marginRight='2px';
      // li.style.wordWrap='break-word'
      // id.style.display='none';
      // li.style.fontFamily='Helvetica, Arial, sans-serif';
      this.renderer.appendChild(this.ul.nativeElement, li)
   
      audio.play();
   
    

     
      }
    // }

      }
   
     
     }
   });
  
   
  }

  triggerResize() {
    // Wait for changes to be applied, then trigger textarea resize.
    this._ngZone.onStable.pipe(take(1))
        .subscribe(() => this.autosize.resizeToFitContent(true));
  }
  loadChatHistory(){
    return this.http.post(environment.apiUrl+'chat/enter-chat-room',{'room_id':this.roomId}).subscribe((body)=>{
      this.roomName=body['room_name'];
      this.chatList=body['chat_list'];
      this.chatList.forEach((chat)=>{
        console.log(chat)
        if(chat.type=='admin'){
          const admin_msg:HTMLLIElement = this.renderer.createElement('li');
          this.renderer.addClass(admin_msg,'admin-message' );
          admin_msg.innerHTML=chat.msg
          this.renderer.appendChild(this.ul.nativeElement, admin_msg)
        }
        else{
        
     
        const li: HTMLLIElement = this.renderer.createElement('li');
        this.renderer.addClass(li,'history-msg-list' );
        const div:HTMLDivElement=this.renderer.createElement('div');
        this.renderer.addClass(div,chat.msg_id );
        const name:HTMLParagraphElement=this.renderer.createElement('p');
        this.renderer.addClass(name,'history-msg-name');
        const msg:HTMLParagraphElement=this.renderer.createElement('p');
        this.renderer.addClass(msg,'history-msg-content' );
        // const name:HTMLParagraphElement=this.renderer.createElement('p');
    // this.renderer.addClass(name,'name-class' );
        const id:HTMLParagraphElement=this.renderer.createElement('p');
        this.renderer.addClass(id,`history-msg-id` );
        const flex:HTMLDivElement=this.renderer.createElement('div');
        this.renderer.addClass(flex,'history-msg-flex')
        const time:HTMLParagraphElement=this.renderer.createElement('p');
        this.renderer.addClass(time,'history-msg-time')
        const icon=this.renderer.createElement('mat-icon');
        if(chat.status=="delivered"){
          this.renderer.appendChild(icon, this.renderer.createText('done_all'));
        }
        else{
          this.renderer.appendChild(icon, this.renderer.createText('done'));
        }
        
        this.renderer.addClass(icon, 'mat-icon');
      this.renderer.addClass(icon, 'material-icons');
        this.renderer.addClass(icon,'history-msg-status-icon' );
        flex.append(time,icon)
        div.append(name,msg,id,flex)
        li.append(div)
      msg.innerHTML=chat.msg;
      id.innerHTML=chat.msg_id;
      name.innerHTML=chat.sender[0].name;
      
        time.innerHTML=this.msgTime(chat.time);
      console.log(chat.time)
      console.log(sessionStorage.getItem('user_id'))
      if(chat.from==sessionStorage.getItem('user_id')){
        li.style.float='right';
        name.style.display='none';
        li.style.background='white   ';
        li.style.color='black';
        li.style.marginRight='5%';
        
      }
      else{
        
        li.style.float='left';
        li.style.background = 'white ';
        icon.style.display='none';
        li.style.color='black';
        li.style.marginLeft='5%';
        name.style.color="orangered"
      }
     
    
    // li.style.maxWidth='70%';
    // id.style.display='none';
    // li.style.clear='both';
    // li.style.padding='10px';
    // li.style.borderRadius='10px';
    // li.style.marginBottom='5px';
    // li.style.marginTop='5px';
    // li.style.marginRight='2px';
    // li.style.wordWrap='break-word'

    // li.style.fontFamily='Helvetica, Arial, sans-serif';
    this.renderer.appendChild(this.ul.nativeElement, li)
    }
      })
    
    })

  }
  msgTime(e){
    let time=new Date(e)
    let hour= time.getHours()
    let minute=time.getMinutes()
    let zone='AM'
    if(hour > 12){
      hour=hour-12;
      zone='PM'
    }
return hour+':'+minute+' '+zone
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
    this.newMessage=this.newMessage.trim()
    if(this.newMessage){
    console.log(this.newMessage.length);
    
    
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
      id_change[0].getElementsByClassName('send-msg-id')[0].innerHTML=response.msg_id;
      let status=id_change[0].getElementsByTagName('mat-icon')[0].innerHTML="done"
      time.innerHTML=this.msgTime(response.time);
      
    });
    const li: HTMLLIElement = this.renderer.createElement('li');
    this.renderer.addClass(li,'send-msg-list' );
    const div:HTMLDivElement=this.renderer.createElement('div');
    this.renderer.addClass(div,temp_id );
    this.renderer.addClass(div,'send-msg-sender' );
    const msg:HTMLParagraphElement=this.renderer.createElement('p');
    this.renderer.addClass(msg,'send-msg-content' );
    // const name:HTMLParagraphElement=this.renderer.createElement('p');
    // this.renderer.addClass(name,'name-class' );
    const flex:HTMLDivElement=this.renderer.createElement('div');
    this.renderer.addClass(flex,'send-msg-time');
    const id:HTMLParagraphElement=this.renderer.createElement('p');
    this.renderer.addClass(id,`send-msg-id` );
  
    const time:HTMLParagraphElement=this.renderer.createElement('p');
    this.renderer.addClass(time,'send-time')
    const icon=this.renderer.createElement('mat-icon');
    this.renderer.appendChild(icon, this.renderer.createText('query_builder'));
    
    this.renderer.addClass(icon, 'mat-icon');
  this.renderer.addClass(icon, 'material-icons');
    this.renderer.addClass(icon,'send-msg-status-icon' );
    flex.append(time,icon)
  div.append(msg,id,flex)
    li.append(div)
   msg.innerHTML=this.newMessage;
   id.innerHTML=temp_id;
  
   
 
  
    // li.style.background = 'white';
    // id.style.display='none';
    // li.style.float='right';
    // li.style.maxWidth='70%';
   
    // li.style.clear='both';
    // li.style.padding='10px';
    // li.style.borderRadius='10px';
    // li.style.marginBottom='5px';
    // li.style.marginTop='5px';
    // li.style.marginRight='2px';
    // li.style.wordWrap='break-word'

    // li.style.fontFamily='Helvetica, Arial, sans-serif';
    this.renderer.appendChild(this.ul.nativeElement, li);
    this.scrollToBottom();
    // var objDiv=document.getElementsByClassName('chat-conntainer')[0];
    // objDiv.scrollTop=objDiv.scrollHeight
    // document.getElementById('message-list').appendChild(element)
    
    this.newMessage = '';
  }
  }
  scrollToBottom(): void {
    try {
        this.myScrollContainer.nativeElement.scrollTop = this.myScrollContainer.nativeElement.scrollHeight;
    } catch(err) { }                 
}
}
