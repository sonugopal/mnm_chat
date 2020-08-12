import { AuthGuard } from './_helpers/auth.guard';
import { SuperAdminChatComponent } from './superAdmin/super-admin-chat/super-admin-chat.component';
import { SuperadminHomeComponent } from './superAdmin/superadmin-home/superadmin-home.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';


const routes: Routes = [
  {
    path:'',redirectTo:'login',pathMatch:'full'
  },

  {
    path:'login',component:LoginComponent
   },
  // {
  //   path:'superadmin',component:SuperadminHomeComponent,children:[
  //     {
  //       path:'chat',component:SuperAdminChatComponent
  //     }
  //   ]
  // },
  {
    path: 'admin', loadChildren: () => import('./admin/admin-module/admin-module.module').then(m =>
      m.AdminModuleModule),
  },
  {
    path: 'superadmin', loadChildren: () => import('./superAdmin/superadmin/superadmin.module').then(m =>
      m.SuperadminModule),canActivate:[AuthGuard]
  },
  {
    path: 'faculty', loadChildren: () => import('./faculty/faculty/faculty.module').then(m =>
      m.FacultyModule),
  },
  {
    path: 'student', loadChildren: () => import('./student/student/student.module').then(m =>
      m.StudentModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes,{onSameUrlNavigation:'reload'})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
