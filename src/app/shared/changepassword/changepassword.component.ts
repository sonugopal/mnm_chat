import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-changepassword',
  templateUrl: './changepassword.component.html',
  styleUrls: ['./changepassword.component.scss']
})
export class ChangepasswordComponent implements OnInit {
  first:boolean=true;
  second:boolean=false;
  third:boolean=false;
  newPassword:FormGroup
  constructor( private fb: FormBuilder) {this.createForm() }

  ngOnInit(): void {
  }
  toSecond(){
    this.second=true;
    this.first=false;
  }
  toThird(){
    this.second=false;
    this.third=true;
  }
  createForm() {
    this.newPassword = this.fb.group({
      
      password:['',Validators.required],
      cpassword:['',Validators.required]
      
    });
   
  }


}
