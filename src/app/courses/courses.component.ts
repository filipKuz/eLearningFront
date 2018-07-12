import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.css']
})
export class CoursesComponent implements OnInit {

  constructor() {  }

  id = 1;

  @Input() username: string;
  @Input() courseId: number;

  ngOnInit() {
    this.id = this.courseId
  }



}
