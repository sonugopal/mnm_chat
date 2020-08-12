import { ErrorInterceptor } from './_helpers/error.interceptor';
import { JwtInterceptor } from './_helpers/jwt.interceptor';
import { SuperAdminChatComponent } from './superAdmin/super-admin-chat/super-admin-chat.component';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginComponent } from './login/login.component';
import { AdminHomeComponent } from './admin/admin-home/admin-home.component';

import { StudentHomeComponent } from './student/student-home/student-home.component';
import { FacultyHomeComponent } from './faculty/faculty-home/faculty-home.component';
import { SuperadminHomeComponent } from './superAdmin/superadmin-home/superadmin-home.component';
import {MatFormFieldModule,} from '@angular/material/form-field';
import { AdminchatComponent } from './admin/adminchat/adminchat.component';
import {FormsModule,ReactiveFormsModule} from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { AdminprofileviewComponent } from './admin/adminprofileview/adminprofileview.component';
import { MatIconModule } from '@angular/material/icon';
import { ChangepasswordComponent } from './shared/changepassword/changepassword.component';
import { EditprofileComponent } from './shared/editprofile/editprofile.component';
import {MatDialogModule} from '@angular/material/dialog';
import { ForgotpasswordComponent } from './forgotpassword/forgotpassword.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    AdminprofileviewComponent,
    ChangepasswordComponent,
    EditprofileComponent,
    ForgotpasswordComponent,
    
    
   
 
   
    
  
   
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatFormFieldModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatIconModule,
    MatDialogModule,
    HttpClientModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },

  
],
  bootstrap: [AppComponent]
})
export class AppModule { }
