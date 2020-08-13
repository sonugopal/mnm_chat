import { SuperadminHomeComponent } from './../superadmin-home/superadmin-home.component';
import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
@Component({
  selector: 'app-super-admin-chat',
  templateUrl: './super-admin-chat.component.html',
  styleUrls: ['./super-admin-chat.component.scss']
})
export class SuperAdminChatComponent implements OnInit {
  optionSelect:boolean=false;
  constructor(private location: Location,private home:SuperadminHomeComponent) { }

  ngOnInit(): void {
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

}
