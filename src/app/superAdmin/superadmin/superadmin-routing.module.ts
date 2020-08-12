import { AuthGuard } from './../../_helpers/auth.guard';
import { SuperadminprofileviewComponent } from './../superadminprofileview/superadminprofileview.component';
import { SuperAdminAddAdminComponent } from './../super-admin-add-admin/super-admin-add-admin.component';
import { SuperAdminAdminComponent } from './../super-admin-admin/super-admin-admin.component';
import { SuperAdminChatComponent } from './../super-admin-chat/super-admin-chat.component';
import { SuperadminHomeComponent } from './../superadmin-home/superadmin-home.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path:'',component:SuperadminHomeComponent,canActivate: [AuthGuard] ,children:[
      {
        path:'chat',component:SuperAdminChatComponent
      },
   
      {
        path:'adminview/:id',component:SuperAdminAdminComponent,runGuardsAndResolvers: 'paramsOrQueryParamsChange'
      },
      {
        path:'adminadd',component:SuperAdminAddAdminComponent
      }
    ]
  },
  {
    path:'superadminprofile',component:SuperadminprofileviewComponent
  }

  


];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SuperadminRoutingModule { }
