import { Component, OnInit, ViewContainerRef, ViewChild } from '@angular/core';
import { UserService } from './user.service';
import { NgForm } from '@angular/forms';
import { RoleService } from '../shared/role.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  constructor(private userService: UserService,
    private roleService: RoleService,
    private router: Router) { }
  users = [];
  roles = [];
  newUser = {
    username: "",
    dateOfBirth: ""
  };

  showDialog: boolean = false;

  sortDirection: string = "asc";
  isAscending: boolean = true;
  sortParam: string = "userId";

  isUnique: boolean = true;

  pageNum: number = 0;
  sizeNum: number = 2;
  totalPages: number = 0;
  userStatus: string = 'all';
  searchTerm: string = '';

  message: string = "";

  model;

  @ViewChild('f') addUserForm: NgForm;

  ngOnInit() {
    this.getAllUsers();
  }

  onSelectUserStatus() {
    if (this.userStatus === "all") { this.getAllUsers() };
    if (this.userStatus === "active") { this.getActiveUsers() };
    if (this.userStatus === "notactive") { this.getNotActiveUsers() };
  }

  getAllUsers() {
    this.userService.getAll(this.pageNum, this.sizeNum, this.sortParam, this.sortDirection, this.searchTerm).subscribe(
      (response) => (this.users = response.body, this.totalPages = Number(response.headers.get('total-pages') * 10)),
      (error) => console.log(error)
    );
  }

  getActiveUsers() {
    this.userService.getActiveUsers(this.pageNum, this.sizeNum, this.sortParam, this.sortDirection, this.searchTerm).subscribe(
      (response) => (this.users = response.body, this.totalPages = Number(response.headers.get('total-pages') * 10)),
      (error) => console.log(error)
    );
  }

  getNotActiveUsers() {
    this.userService.getNotActiveUsers(this.pageNum, this.sizeNum, this.sortParam, this.sortDirection, this.searchTerm).subscribe(
      (response) => (this.users = response.body, this.totalPages = Number(response.headers.get('total-pages') * 10)),
      (error) => console.log(error)
    );
  }

  isUsernameUnique() {
    if (this.newUser.username.length > 0) {
      this.userService.isUsernameUnique(this.newUser.username, 'add', '').subscribe(
        response => this.isUnique = response,
        error => console.log(error)
      )
    }
  }

  postNewUser() {
    if (this.model.month <= 9) {
      this.model.month = "0" + this.model.month;
    }
    if (this.model.day <= 9) {
      this.model.day = "0" + this.model.day;
    }
    this.newUser.dateOfBirth = this.model.year + "-" + this.model.month + "-" + this.model.day;
    this.userService.postNewUser(this.newUser).subscribe(
      response => [this.users.push(response), this.resetAddForm()],
      error => console.log(error)
    )
  }

  changeUserStatus(id: number) {
    this.userService.changeUserStatus(id).subscribe(
      response => [this.message = response, alert(this.message), this.onSelectUserStatus()],
      error => console.log(error)
    );
  }

  selectPageNum(pageNum) {
    this.pageNum = pageNum;
    this.onSelectUserStatus();
  }

  onSort(sortParam: string) {
    this.isAscending = !this.isAscending;
    this.isAscending ? this.sortDirection = "asc" : this.sortDirection = "desc";
    this.sortParam = sortParam;
    this.onSelectUserStatus();
  }

  onSearch(term: string) {
    this.router.navigate(['profile', term]);
  }

  resetAddForm() {
    this.isUnique = true;
    this.addUserForm.resetForm();
  }

  getRoles() {
    this.roleService.getAllRoles().subscribe(
      response => this.roles = response,
      error => console.log(error)
    )
  }

}
