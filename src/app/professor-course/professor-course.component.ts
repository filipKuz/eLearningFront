import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-professor-course',
  templateUrl: './professor-course.component.html',
  styleUrls: ['./professor-course.component.css']
})
export class ProfessorCourseComponent implements OnInit {

  constructor() { }

  @Input() userId: number;
  @Input() courseId: number;

  ngOnInit() {
  }

}
