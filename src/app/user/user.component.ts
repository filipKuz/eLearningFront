import { Component, OnInit } from '@angular/core';
import { UserService } from './user.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  constructor(private userService: UserService) { }
  users = [];

  ngOnInit() {
  }
  getAllUsers() {
    this.userService.getAll().subscribe(
      (response) => this.users = response,
      (error) => console.log(error)
    );
  }

}
