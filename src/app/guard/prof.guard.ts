import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { AuthorizationService } from '../authorization/authorization.service';

@Injectable()
export class ProfGuard implements CanActivate {

  constructor(private auth: AuthorizationService) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    if (this.auth.getRoles(this.auth.getToken()).includes("ROLE_PROFESSOR")) {
      return true;
    }else{
      return false;
    }
  }
}
