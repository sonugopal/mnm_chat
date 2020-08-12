import { FacultyHomeComponent } from './../faculty-home/faculty-home.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FacultyRoutingModule } from './faculty-routing.module';


@NgModule({
  declarations: [FacultyHomeComponent],
  imports: [
    CommonModule,
    FacultyRoutingModule
  ]
})
export class FacultyModule { }
