import { adminDetail } from './../../_models/user';
import { SuperadminHomeComponent } from './../superadmin-home/superadmin-home.component';
import { Observable, Subscription } from 'rxjs';
import { environment } from './../../../environments/environment.prod';
import { HttpClient } from '@angular/common/http';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { Component, OnInit, Input, SimpleChanges,ChangeDetectorRef,OnDestroy} from '@angular/core';
import { Location } from '@angular/common';
import { Admin } from 'src/app/_models/user';
import { ChangeDetectionStrategy } from '@angular/core';
import { takeUntil } from 'rxjs/operators';
import { timer } from 'rxjs';
import { analyzeAndValidateNgModules } from '@angular/compiler';



@Component({
  selector: 'app-super-admin-admin',
  templateUrl: './super-admin-admin.component.html',
  styleUrls: ['./super-admin-admin.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush 
})
export class SuperAdminAdminComponent implements OnInit {
  addAdmin:boolean=false;
  admin:Observable<adminDetail[]>;
  adminView:boolean=false;
  foo:boolean=true;

  constructor(private location: Location,
    private Router:ActivatedRoute,
    private http:HttpClient,
    private route:Router,
    private cdRef: ChangeDetectorRef,
    private home:SuperadminHomeComponent, // <== added
   ) {}
    
  ngOnInit(): void {
    
  // this.id=this.Router.snapshot.params.id
    this.Router.params.subscribe(routeParams => {
      this.getAdminDetail(routeParams.id);
  
   
    });
  }
  
  getAdminDetail(id){
    return this.http.post<any>(`${environment.apiUrl}user/super/get-admin-details`,{'id':id}).subscribe((payload)=>{
      this.admin=payload;
      console.log(this.admin)
      // this.load();
      this.cdRef.detectChanges();

    })
    
  
  }

  cancel() {
  
    this.home.chatport=true;
    this.home.TabIndex=1;
    this.location.back();
     // <-- go back to previous location on cancel
  }
  load(){
    

  }
   
  
}
