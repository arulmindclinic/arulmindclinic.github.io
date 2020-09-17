import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { AuthcontextService } from '../services/authcontext.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private authCtxService: AuthcontextService, private router: Router) {}
  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    console.log('AuthGuard#canActivate called');

    if (this.authCtxService.currentUser) {
      return true;
    } else {
      this.router.navigate(['/home']);
      return false;
    }

    // return this.authCtxService.currentUser != null;
  }
}
