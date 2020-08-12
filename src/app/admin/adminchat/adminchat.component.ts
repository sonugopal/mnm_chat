import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
@Component({
  selector: 'app-adminchat',
  templateUrl: './adminchat.component.html',
  styleUrls: ['./adminchat.component.scss']
})
export class AdminchatComponent implements OnInit {
searchShow:boolean=false;
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
  fnSearchShow(){
    this.searchShow=!this.searchShow;
  }

}
