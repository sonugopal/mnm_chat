import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-forgotpassword',
  templateUrl: './forgotpassword.component.html',
  styleUrls: ['./forgotpassword.component.scss']
})
export class ForgotpasswordComponent implements OnInit {

  first:boolean=true;
  second:boolean=false;
  third:boolean=false;
  newPassword:FormGroup;
  enterMobile:FormGroup;
  constructor( private fb: FormBuilder) {this.createForm(),this.mobileForm() }

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
mobileForm(){
  this.enterMobile = this.fb.group({
      
    mobile:['',Validators.required],
   
    
  });

}
}
