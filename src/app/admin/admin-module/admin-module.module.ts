import { AdminchatComponent } from './../adminchat/adminchat.component';
import { AdminHomeComponent } from './../admin-home/admin-home.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatSidenavModule} from '@angular/material/sidenav';
import { AdminModuleRoutingModule } from './admin-module-routing.module';
import {MatMenuModule} from '@angular/material/menu';
import {MatIconModule} from '@angular/material/icon';
import {MatTabsModule} from '@angular/material/tabs';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
@NgModule({
  declarations: [
    AdminHomeComponent,
    AdminchatComponent
  ],
  imports: [
    CommonModule,
    AdminModuleRoutingModule,
    MatIconModule,
    MatTabsModule,
    MatSidenavModule,
    MatFormFieldModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatMenuModule
  ]
})
export class AdminModuleModule { }
