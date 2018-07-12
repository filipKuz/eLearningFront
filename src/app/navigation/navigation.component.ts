import { Component, OnInit } from '@angular/core';
import { AuthorizationService } from '../authorization/authorization.service';
import { Router } from '@angular/router';
import { DataService } from '../shared/data.service';
import { UserService } from '../user/user.service';
import { AdminGuard } from '../guard/admin.guard';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {

  constructor(private auth: AuthorizationService,
    private data: DataService,
    private userService: UserService,
    private route: Router) {
  }

  isLoggedIn: boolean = false;
  userName: string = "";

  userId: number;


  ngOnInit() {
    this.data.currentMessage.subscribe(message => this.isLoggedIn = message);
    this.data.username.subscribe(message => [this.userName = message, this.getIdOfLoggedUser()]);
  }

  canUserSeeThis() {
    if (this.auth.getRoles(this.auth.getToken()).includes("ROLE_ADMIN")) {
      return true;
    } else {
      return false;
    }
  }

  isStudent() {
    if (this.auth.getRoles(this.auth.getToken()).includes("ROLE_STUDENT")) {
      return true;
    } else {
      return false;
    }
  }

  getIdOfLoggedUser() {
    if (this.isLoggedIn) {
      this.userService.getUserByUsername(this.userName).subscribe(
        (response: any) => this.userId = response.userId,
        error => console.log(error)
      );
    }
  }

  logOut() {
    this.auth.logout();
    this.isLoggedIn = false;
    this.route.navigate(['/login']);
  }

}
