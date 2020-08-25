import { User } from './../_models/user';
import { AuthGuard } from './../_helpers/auth.guard';
import { AuthenticationService } from './../_services/authentication.service';
import { ForgotpasswordComponent } from './../forgotpassword/forgotpassword.component';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { connectableObservableDescriptor } from 'rxjs/internal/observable/ConnectableObservable';
import { MatDialog } from '@angular/material/dialog';
import { ChangepasswordComponent } from '../shared/changepassword/changepassword.component';
import { Router, ActivatedRoute, CanActivate } from '@angular/router';
import { first } from 'rxjs/operators';
import { HttpHeaders } from '@angular/common/http';
const headers = new HttpHeaders({ 'Content-Type': 'application/json', 'strAppInfo': 'TNT1' })
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  loading=false;
  hide = true;
  UserNotFound:boolean=false;
  submitted = false;
  returnUrl: string;
  loginCredential:any;
  error:boolean=false;
  
  constructor(private fb: FormBuilder,
    public dialog: MatDialog,
    private router:Router,
    private AuthenticationService:AuthenticationService,
    private route: ActivatedRoute,
    private AuthGuard:AuthGuard) { 
      if (this.AuthenticationService.currentUserValue) { 
        this.router.navigate(['/']);
    }
    }

  ngOnInit(): void {
    const currentUser =JSON.parse( localStorage.getItem('currentUser'))
    console.log(currentUser)
   if(currentUser){
    this.router.navigate(['/superadmin'] );
  
   }

    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
  });

 
  this.returnUrl='/superadmin'
  }
  get f() { return this.loginForm.controls; }
 

  openChangePassword() {
    const dialogRef = this.dialog.open(ForgotpasswordComponent);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }
  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    // if (this.loginForm.invalid) {
    //     return;
    // }

    this.loading = true;
    this.AuthenticationService.login(this.f.username.value, this.f.password.value)
        .pipe(first())
        .subscribe((body)=>{

          
          if(body['status']==true){
       
            this.router.navigate([this.returnUrl]);
            sessionStorage.setItem("role",body.user['role'])
            sessionStorage.setItem('api_token',body['api_token'])
            sessionStorage.setItem('user_id',body.user['user_id'])
           
        }
        else{
          this.error = true;
          this.loading = false;
        }
         
        })
        
}

  // fn_login_email() {
  //   this.http.post('http://15.206.134.157:3000/user/login_user', this.login_obj, { headers }).subscribe((body) => {
  //     // this.username_exists = err['blnAPIStatus']
  //     console.log(body)
  //     if (body) {
  //       this.username_exists = body['blnAPIStatus']
  //       if (body['blnAPIStatus'] == true) {
  //         localStorage.setItem('strToken', body['strToken']);
  //         localStorage.setItem("id", body['_id']);
  //         localStorage.setItem('strType', body['strType']);
  //         if (localStorage.getItem('strType') == 'ADMIN') {
  //           this.route.navigate(['/mainui'])
  //         } else {
  //           this.route.navigate(['/login'])
  //           console.log('not admin')
  //         }

  //       }
  //     }

  //   }, (error) => {
  //     console.log(error['error']['blnAPIStatus']);
  //     // this.username_exists = error.blnAPIStatus
  //     if(error){
  //       this.errors = error['error']
  //       console.log(this.errors)
  //       if(this.errors['arrErrors'][0] == "CREDENTIAL_INVALID"){
  //         this.password_worng = false;
  //         console.log(this.errors)

  //       }
  //       if(this.errors['arrErrors'][0] == "INVALID_USER_NAME"){
  //         this.username_exists = false;
  //         console.log(this.errors)

  //       }
        
  //     }


  //   });

  // }
}
