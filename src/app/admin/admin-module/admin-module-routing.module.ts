import { AdminprofileviewComponent } from './../adminprofileview/adminprofileview.component';
import { AdminchatComponent } from './../adminchat/adminchat.component';
import { AdminHomeComponent } from './../admin-home/admin-home.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
 
  {
    path:'',component:AdminHomeComponent,children:[
      {
        path:'chat',component:AdminchatComponent
      },
   
  
    ]
  },
  {
    path:'profileview',component:AdminprofileviewComponent
  }
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminModuleRoutingModule { }
