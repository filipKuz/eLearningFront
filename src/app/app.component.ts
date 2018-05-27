import { Component } from '@angular/core';
import { AuthorizationService } from './authorization/authorization.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';

  constructor(private auth: AuthorizationService,
              private route: Router) {
                this.isLogged();
  }

  isLoggedIn: boolean = false;

  isLogged() {
    this.isLoggedIn = this.auth.isLoggedIn();
  }

  logOut() {
    this.auth.logout();
    this.isLoggedIn = false;
    this.route.navigate(['/login']);
  }

}
