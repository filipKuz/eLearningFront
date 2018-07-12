import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpResponse, HttpEvent, HttpRequest, HttpHandler, HttpErrorResponse } from '@angular/common/http';
import { AuthorizationService } from './authorization.service';
import { Observable } from "rxjs/Observable";
import 'rxjs/add/operator/do';
import { Router } from '@angular/router';

@Injectable()
export class JwtInterceptorService implements HttpInterceptor {

  constructor(public auth: AuthorizationService,
              private router: Router) { }
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request).do((event: HttpEvent<any>) => {
      if (event instanceof HttpResponse) {
        // do stuff with response if you want
      }
    }, (err: any) => {
      if (err instanceof HttpErrorResponse) {
        if (err.status === 401) {
          console.log("Unauthorized");
        } else if (err.status === 403) {
          console.log("403");
        }
      }
    });
  }
}
