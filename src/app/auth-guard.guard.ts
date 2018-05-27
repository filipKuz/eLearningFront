import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { AuthorizationService } from './authorization/authorization.service';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private auth: AuthorizationService,
              private router: Router) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    
        if (this.auth.isLoggedIn()) {
            return true;
        }

        this.router.navigate(['/login']);
        return false;

  }
}
