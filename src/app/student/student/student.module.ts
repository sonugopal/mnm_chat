import { StudentHomeComponent } from './../student-home/student-home.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StudentRoutingModule } from './student-routing.module';


@NgModule({
  declarations: [StudentHomeComponent],
  imports: [
    CommonModule,
    StudentRoutingModule
  ]
})
export class StudentModule { }
