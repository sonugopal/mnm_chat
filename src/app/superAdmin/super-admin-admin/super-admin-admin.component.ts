import { Observable } from 'rxjs';
import { environment } from './../../../environments/environment.prod';
import { HttpClient } from '@angular/common/http';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { Component, OnInit, Input, SimpleChanges } from '@angular/core';
import { Location } from '@angular/common';
import { Admin } from 'src/app/_models/user';
import { ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-super-admin-admin',
  templateUrl: './super-admin-admin.component.html',
  styleUrls: ['./super-admin-admin.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush 
})
export class SuperAdminAdminComponent implements OnInit {
id:any;
  addAdmin:boolean=false;

  adminView:boolean=false;
  mySubscription: any;
  admin:Admin[];
  constructor(private location: Location,
    private Router:ActivatedRoute,
    private http:HttpClient,
    private route:Router) {
      // this.route.routeReuseStrategy.shouldReuseRoute = () => false;

     }

    
  ngOnInit(): void {
  
    
    this.Router.params.subscribe(
      params => {
        this.getAdminDetail(params.id);
      }
  );
  
  }
 


  getAdminDetail(id){

    return this.http.post<any>(`${environment.apiUrl}user/super/get-admin-details`,{'id':id}).subscribe((body)=>{
      this.admin=body;
      console.log(body)
      
      
    })
    
  }
  adminAdd(){
    
    this.addAdmin=true;
    this.adminView=false;
    
  }
  viewAdmin(){
    
    this.addAdmin=false;
    this.adminView=true;
    
  }
  cancel() {
    setTimeout(()=>{
      window.location.reload();
    }, 50);
    this.location.back();
     // <-- go back to previous location on cancel
  }
}
