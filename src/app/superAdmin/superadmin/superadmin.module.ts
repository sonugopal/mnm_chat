import { SuperadminprofileviewComponent } from './../superadminprofileview/superadminprofileview.component';
import { SuperAdminAddAdminComponent } from './../super-admin-add-admin/super-admin-add-admin.component';
import { SuperAdminAdminComponent } from './../super-admin-admin/super-admin-admin.component';
import { SuperAdminChatComponent } from './../super-admin-chat/super-admin-chat.component';
import { SuperadminHomeComponent } from './../superadmin-home/superadmin-home.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SuperadminRoutingModule } from './superadmin-routing.module';
import {MatMenuModule} from '@angular/material/menu';
import {MatIconModule} from '@angular/material/icon';
import {MatTabsModule} from '@angular/material/tabs';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import { PickerModule } from '@ctrl/ngx-emoji-mart';

@NgModule({
  declarations: [
    SuperadminHomeComponent,
    SuperAdminChatComponent,
    SuperAdminAdminComponent,
    SuperAdminAddAdminComponent,
    SuperadminprofileviewComponent
  ],
  imports: [
    CommonModule,
    SuperadminRoutingModule,
    MatMenuModule,
    MatIconModule,
    MatTabsModule,
    MatSidenavModule,
    MatFormFieldModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatSnackBarModule,
    PickerModule,
  
  ]
})
export class SuperadminModule { }
