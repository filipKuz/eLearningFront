import { Component, OnInit } from '@angular/core';
import { ExamService } from '../shared/exam.service';

@Component({
  selector: 'app-student-exam-term',
  templateUrl: './student-exam-term.component.html',
  styleUrls: ['./student-exam-term.component.css']
})
export class StudentExamTermComponent implements OnInit {

  constructor(private _examService: ExamService) { }

  exams = [];
  student = {};

  ngOnInit() {}
}
