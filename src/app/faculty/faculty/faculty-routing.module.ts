import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FacultyHomeComponent } from '../faculty-home/faculty-home.component';

const routes: Routes = [
  {
    path:'',component:FacultyHomeComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FacultyRoutingModule { }
