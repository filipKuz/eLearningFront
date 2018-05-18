import { Injectable } from '@angular/core';
import { AuthorizationService } from './authorization.service';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class TokenInterceptorService implements HttpInterceptor {

  constructor(public auth: AuthorizationService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    req = req.clone({
      setHeaders: {
        Authorization: this.auth.getToken()
      }
    });
    return next.handle(req);
  }

}
