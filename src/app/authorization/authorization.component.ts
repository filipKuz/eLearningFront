import { Component, OnInit } from '@angular/core';
import { AuthorizationService } from './authorization.service';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { DataService } from '../shared/data.service';
import { UserService } from '../user/user.service';

@Component({
  selector: 'app-authorization',
  templateUrl: './authorization.component.html',
  styleUrls: ['./authorization.component.css']
})
export class AuthorizationComponent implements OnInit {

  wrongUsernameOrPass: boolean;

  constructor(private authService: AuthorizationService,
    private router: Router, private data: DataService,
    private userService: UserService) {
    this.wrongUsernameOrPass = false;
  }

  loginData: any = {};
  message: boolean = false;

  ngOnInit() {
    this.data.currentMessage.subscribe(message => this.message = message);
  }

  getIdOfLoggedUser() {
    this.userService.getUserByUsername(this.authService.getUser()).subscribe(
      (response: any) => [this.router.navigate(['/profile', response.userId])],
      error => console.log(error)
    );
  }

  login() {
    this.authService.login(this.loginData.userName, this.loginData.userPassword)
      .subscribe((result: boolean) => {
        if (result) {
          this.messageToNavLoginSuccess();
          this.getIdOfLoggedUser();
          
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

  messageToNavLoginSuccess() {
    this.data.changeMessage(true);
  }
}
