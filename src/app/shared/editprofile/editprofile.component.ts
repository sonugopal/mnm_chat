import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-editprofile',
  templateUrl: './editprofile.component.html',
  styleUrls: ['./editprofile.component.scss']
})
export class EditprofileComponent implements OnInit {
  profileForm: FormGroup;
  constructor(private fb: FormBuilder) { this.createForm();}

  ngOnInit(): void {
  }
  createForm() {
    this.profileForm = this.fb.group({
      
      name:['',Validators.required]
      
    });
    this.profileForm.patchValue({
     
      name:'name',
     
      });
  }

}
