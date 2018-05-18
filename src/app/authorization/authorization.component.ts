import { Component, OnInit } from '@angular/core';
import { AuthorizationService } from './authorization.service';

@Component({
  selector: 'app-authorization',
  templateUrl: './authorization.component.html',
  styleUrls: ['./authorization.component.css']
})
export class AuthorizationComponent implements OnInit {

  constructor(private authService: AuthorizationService) { }

  loginData: any = {};


  ngOnInit() {
  }

  login() {
    console.log(this.loginData);
    this.authService.login(this.loginData.userName, this.loginData.userPassword)
      .subscribe(result => {
       if (result) {
          //login successful
          console.log("success");
       }else {
         //login failed
         console.log("fail");
       }
      }, error => {
        console.log(error);
      });
  }
}
