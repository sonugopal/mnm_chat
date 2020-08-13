import { AuthenticationService } from './../_services/authentication.service';
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';



  



@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
    constructor(
        private router: Router,
        private authenticationService: AuthenticationService
    ) { }

    canActivate( route: ActivatedRouteSnapshot, state:  RouterStateSnapshot) {
        const currentUser = this.authenticationService.currentUserValue;
        // console.log(currentUser)
        if (currentUser) {
          
         
           
           return true;
            // logged in so return true
           
           
            
        }

        // not logged in so redirect to login page with the return url
        this.router.navigate(['/login'] );
        return false;
    }
}
  

