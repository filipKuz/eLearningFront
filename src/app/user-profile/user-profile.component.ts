import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../user/user.service';
import { UserProfileService } from './user-profile.service';
import { RoleService } from '../shared/role.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit, OnDestroy {

  @ViewChild("fPsw") passEditForm: NgForm;

  id: number;
  private sub: any;
  user: any = {
    "imagePath": ""
  };
  file: File;
  roles = [];
  model: any = {};
  isUnique: boolean = true;
  usernameForCheck: string;
  
  temp1: string;
  temp2:string;

  newPass: string;
  repeatedPass: string;
  oldPass: string;
  matchingPasswords: boolean = true;
  messagge: string;
  showAlert: boolean = false;
  showMessage: boolean = false;
  isSuccessfull: boolean = false;

  dateOfBirth: string;

  constructor(private route: ActivatedRoute,
    private userService: UserService,
    private userProfileService: UserProfileService,
    private roleService: RoleService) {
  }

  userId:number = 1;
  courseId: number = 1;

  ngOnInit() {
    this.getRoles();
    this.sub = this.route.params.subscribe(params => {
      this.id = +params['id']; // (+) converts string 'id' to a number
      this.userService.getUserById(this.id).subscribe(
        (response: any) => [this.user = response,
          this.usernameForCheck = response.username,
          this.dateOfBirth = response.dateOfBirth,
          this.user.dateOfBirth = this.transformFormattedDate(response.dateOfBirth)],
        error => console.log(error)
      );
    });
  }

  isUsernameUnique() {
    if (this.user.username.length > 0) {
      this.userService.isUsernameUnique(this.user.username, 'edit', this.usernameForCheck).subscribe(
        response => this.isUnique = response,
        error => console.log(error)
      )
    }
  }

  userEdit() {
    this.temp1 = this.model.month;
    this.temp2 = this.model.day;
    if (this.model.month <= 9) {
      this.temp1 = "0" + this.model.month;
    }
    if (this.model.day <= 9) {
      this.temp2 = "0" + this.model.day;
    }
    this.user.dateOfBirth = this.model.year + "-" + this.temp1 + "-" + this.temp2;
    this.userProfileService.putUser(this.id, this.user).subscribe(
      response => [this.user = response, this.dateOfBirth = response.dateOfBirth],
      error => console.log(error)
    );
  }

  fileChange(event) {
    let eventObj: MSInputMethodContext = <MSInputMethodContext>event;
    let target: HTMLInputElement = <HTMLInputElement>eventObj.target;
    let files: FileList = target.files;
    this.file = files[0];
    this.userProfileService.uploadImage(this.file).subscribe(
      response => this.user.imagePath = response,
      error => console.log(error)
    );
    console.log(this.user);
  }

  getRoles() {
    this.roleService.getAllRoles().subscribe(
      response => this.roles = response,
      error => console.log(error)
    );
  }

  transformFormattedDate(date: string) {
    var dateSpilt = date.split('-');
    this.model = { year: +(dateSpilt[0]), month: +(dateSpilt[1]), day: +(dateSpilt[2]) };
  }

  checkPasswords() {
    if (this.newPass == this.repeatedPass) {
      this.matchingPasswords = true;
    } else {
      this.matchingPasswords = false;
    }
  }

  changePassword() {
    this.userProfileService.editPassword(this.oldPass, this.newPass, this.repeatedPass, this.id)
      .subscribe(
        response => {this.messagge = response, this.showAlert = !this.showAlert, this.passEditForm.resetForm(), this.showMessage = true},
        error => console.log(error)
      );
  }


  ngOnDestroy() {
    this.sub.unsubscribe();
  }

}
