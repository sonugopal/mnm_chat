import { SuperadminHomeComponent } from './../superadmin-home/superadmin-home.component';
import { environment } from './../../../environments/environment.prod';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Location } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';
import { analyzeAndValidateNgModules } from '@angular/compiler';

@Component({
  selector: 'app-super-admin-add-admin',
  templateUrl: './super-admin-add-admin.component.html',
  styleUrls: ['./super-admin-add-admin.component.scss']
})
export class SuperAdminAddAdminComponent implements OnInit {
  registerForm: FormGroup;
  constructor(  private fb: FormBuilder,private location: Location,private http: HttpClient,
    private _snackBar: MatSnackBar,
    private home:SuperadminHomeComponent) { this.createForm() }

  ngOnInit(): void {

  }
  createForm() {
    this.registerForm = this.fb.group({
      name:['',Validators.required],
      mobile:['',Validators.required],
      email:['',Validators.required],
      
    });
  }
  cancel() {
this.home.chatport=true;
this.home.TabIndex=1;
    this.location.back(); // <-- go back to previous location on cancel
  }
  submitForm() {
    var currentUser =JSON.parse( localStorage.getItem('currentUser'))
    console.log(currentUser.api_token)
    let objAdmin=this.registerForm.value;
 
   
    return this.http.post<any>(environment.apiUrl+'user/super/create-admin', objAdmin).subscribe(
      (body)=>{
        if(body['status']==true){
          this._snackBar.open('You have  successfully saved', '', {
            duration: 2000,
          });

        }
      }
     
    ),(error)=>{
      console.log(error);
    }}

    }
