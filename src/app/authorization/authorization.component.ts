import { Component, OnInit } from '@angular/core';
import { AuthorizationService } from './authorization.service';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-authorization',
  templateUrl: './authorization.component.html',
  styleUrls: ['./authorization.component.css']
})
export class AuthorizationComponent implements OnInit {

  wrongUsernameOrPass: boolean;

  constructor(private authService: AuthorizationService,
    private router: Router) {
    this.wrongUsernameOrPass = false;
  }

  loginData: any = {};


  ngOnInit() {
  }

  login() {
    this.authService.login(this.loginData.userName, this.loginData.userPassword)
      .subscribe((result: boolean) => {
        if (result) {
          // login successful
          this.router.navigate(['/users']);
        }
      }, (error: Error) => {
        if (error.toString() === 'Ilegal login') {
          this.wrongUsernameOrPass = true;
          console.log(error);
        } else {
          Observable.throw(error);
        }
      });
  }
}
