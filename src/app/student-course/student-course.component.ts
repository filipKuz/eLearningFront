import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-student-course',
  templateUrl: './student-course.component.html',
  styleUrls: ['./student-course.component.css']
})
export class StudentCourseComponent implements OnInit {

  constructor() { }

  @Input() userId: number;
  @Input() courseId: number;

  ngOnInit() {
  }



}
