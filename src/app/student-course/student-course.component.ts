import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { ExamService } from '../shared/exam.service';
import { AuthorizationService } from '../authorization/authorization.service';
import { ExamRecordsService } from '../shared/examRecordsService';

@Component({
  selector: 'app-student-course',
  templateUrl: './student-course.component.html',
  styleUrls: ['./student-course.component.css']
})
export class StudentCourseComponent implements OnInit {

  constructor(private _examService: ExamService, private _authService: AuthorizationService, private _recordsService: ExamRecordsService) { }

  exams = [];
  records = [];
  course = {};
  studentUsername = "";
  showApplyDialog = false;
  examId: number;

  @Input() username: string;
  @Input("courseId") courseId: number;

  ngOnInit() {
    this.studentUsername = this._authService.getUser();
    this.getExamsByCourseAndStudent(this.courseId, this.studentUsername);
    this.getRecordsByStudentAndCourse(this.studentUsername, this.courseId);
  }

  getExamsByCourseAndStudent(courseId: number, studentUsername: string) {
    this._examService.getByCourseAndStudent(courseId, studentUsername).subscribe(
      response => (this.exams = response.body),
      error => console.log(error)
    );
  }

  getRecordsByStudentAndCourse(studentUsername: string, courseId: number) {
    this._recordsService.getAllByStudentAndCourse(studentUsername, courseId).subscribe(
      response => (this.records = response),
      error => console.log(error)
    );
  }

  onApplyForExam(examId: number) {
    this.showApplyDialog = !this.showApplyDialog;
    this.examId = examId;
  }

  onApplyConfirmed() {
    this._examService.applyForExam(this.studentUsername, this.examId).subscribe(
      response => [this.getExamsByCourseAndStudent(this.courseId, this.studentUsername), this.getRecordsByStudentAndCourse(this.studentUsername, this.courseId)],
      error => console.log(error)
    );
    this.showApplyDialog = !this.showApplyDialog;
  }
}