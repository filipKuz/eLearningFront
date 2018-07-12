import { Component, OnInit, ViewChild } from '@angular/core';
import { CourseService } from './course.service';
import { NgForm } from '@angular/forms';
import { UserService } from '../user/user.service';
import { DepartmentService } from '../department/department.service';
import { AuthorizationService } from '../authorization/authorization.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.css']
})
export class CourseComponent implements OnInit {

  constructor(private courseService: CourseService, private userService: UserService, private departmentService: DepartmentService, private autServise: AuthorizationService
      , private router: Router) { }

  roles = [];
  courses = [];
  coursesProf= [];
  coursesStudent= [];
  students = [];
  departments = [{
    departmentId: 1,
    name: "Softverske i informacione tehnologije"
  }];
  username = ""; //ovo
  isAdmin = false;
  isProfessor = false;
  isStudent = false;
  courseId = 0; //ovo


  showDialog: boolean = false;

  @ViewChild('f') addUserForm: NgForm;

  newCourse = {
    courseId: 0,
    departmentId: 0,
    name: "",
    active: false,
    studentIds: []
  }

  ngOnInit() {
    this.getRoles();
    this.populateRoles();

    if(this.isStudent){
      this.getAllCoursesByStudent();
    }
    if(this.isAdmin){
      this.getAllCourses();
    }
    if(this.isProfessor){
      this.getAllCoursesByProfessor();
    }
    
    this.getAllDepartments();
    this.getAllStudents();
    this.username = this.autServise.getUser();
    
    console.log(this.isAdmin);
    console.log(this.isProfessor);
    console.log(this.isStudent);
  }

  getRoles(){
   this.roles = this.autServise.getRoles(this.autServise.getToken()).split(", ");
  }

  populateRoles(){
    if(this.roles.includes('ROLE_ADMIN')) {
      this.isAdmin = true;
    }
    if(this.roles.includes("ROLE_PROFESSOR")) {
      this.isProfessor = true;
    }
    if(this.roles.includes("ROLE_STUDENT")) {
      this.isStudent = true;
    }
  }
  
  getAllCourses() {
    this.courseService.getAll().subscribe(
      (response) => (this.courses = response.body),
      (error) => console.log(error)
    );
  }
  
  changeId(id: number){
    this.courseId = id;
  }
  
  getAllCoursesByProfessor() {
    this.courseService.getAllByProfessor(this.autServise.getUser()).subscribe(
      (response) => (this.coursesProf = response.body),
      (error) => console.log(error)
    );
  }

  getAllCoursesByStudent() {
    this.courseService.getAllByStudent(this.autServise.getUser()).subscribe(
      (response) => (this.coursesStudent = response.body),
      (error) => console.log(error)
    );
  }

  

  getAllStudents() {
    this.userService.getAll(0, 99, "userId,asc", "", "").subscribe(
      (response) => [this.students = response.body,console.log(this.students)],
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
      response => [this.courses.push(response),this.addStudentCourse(response, this.newCourse.studentIds)],
      error => console.log(error)
    );
    this.showDialog =! this.showDialog;
  }

  addStudentCourse(course, ids: any){
    console.log(course);
    this.courseService.postNewStudentCourse(course.courseId, ids).subscribe(
      response => [this.resetAddForm()],
      error => console.log(error)
    );
  }
}