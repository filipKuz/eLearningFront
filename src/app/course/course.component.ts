import { Component, OnInit, ViewChild } from '@angular/core';
import { CourseService } from './course.service';
import { NgForm } from '@angular/forms';
import { UserService } from '../user/user.service';
import { DepartmentService } from '../department/department.service';

@Component({
  selector: 'app-courses',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.css']
})
export class CourseComponent implements OnInit {

  constructor(private courseService: CourseService, private userService: UserService, private departmentService: DepartmentService) { }

  courses = [];
  students = [];
  departments = [{
    departmentId: 1,
    name: "Softverske i informacione tehnologije"
  }];
  @ViewChild('f') addUserForm: NgForm;

  newCourse = {
    courseId: 0,
    departmentId: 0,
    name: "",
    active: false
  }

  ngOnInit() {
    this.getAllCourses();
    this.getAllDepartments();
    this.getAllStudents();
  }

  getAllCourses() {
    this.courseService.getAll().subscribe(
      (response) => (this.courses = response.body),
      (error) => console.log(error)
    );
  }

  getAllStudents() {
    this.userService.getAll(0, 99, "userId,asc", "", "").subscribe(
      (response) => (this.students = response.body),
      (error) => console.log(error)
    );
  }

  getAllDepartments() {
    this.departmentService.getAll().subscribe(
      (response) => (this.departments = response.body),
      (error) => console.log(error)
    );
  }

  public onEditCourse(id) {

  }

  public onRemove(id) {
    this.courseService.delete(id).subscribe(
      (response) => (this.getAllCourses()),
      (error) => console.log(error)
    );
  }

  resetAddForm() {
    this.addUserForm.resetForm();
  }

  postNewCourse() {
    this.newCourse.departmentId = this.newCourse.departmentId[0];
    console.log(this.newCourse);
    this.courseService.postNewCourse(this.newCourse).subscribe(
      response => [this.courses.push(response), this.resetAddForm()],
      error => console.log(error)
    );
  }
}