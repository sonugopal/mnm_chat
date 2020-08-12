import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
@Component({
  selector: 'app-super-admin-chat',
  templateUrl: './super-admin-chat.component.html',
  styleUrls: ['./super-admin-chat.component.scss']
})
export class SuperAdminChatComponent implements OnInit {
  optionSelect:boolean=false;
  constructor(private location: Location) { }

  ngOnInit(): void {
  }
  option(){
    this.optionSelect=!this.optionSelect
  }
  optionClose(){
    this.optionSelect=false;
  }
  cancel() {
    setTimeout(()=>{
      window.location.reload();
    }, 50);
    this.location.back(); // <-- go back to previous location on cancel
  }

}
