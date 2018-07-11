import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { ExamService } from '../shared/exam.service';
import { AuthorizationService } from '../authorization/authorization.service';

@Component({
  selector: 'app-student-course',
  templateUrl: './student-course.component.html',
  styleUrls: ['./student-course.component.css']
})
export class StudentCourseComponent implements OnInit {

  constructor(private _examService: ExamService, private _authService: AuthorizationService) { }

  exams = [];
  course = {};
  studentUsername = "";
  showApplyDialog = false;
  examId: number;

  @Input() userId: number;
  @Input() courseId: number;


  ngOnInit() {
    this.studentUsername = this._authService.getUser();
    this.getExamsByCourseAndStudent(this.courseId, this.studentUsername);
  }

  getExamsByCourseAndStudent(courseId: number, studentUsername: string) {
    this._examService.getByCourseAndStudent(this.courseId, this.studentUsername).subscribe(
      response => (this.exams = response.body),
      error => console.log(error)
    );
  }

  onApplyForExam(examId: number) {
    this.showApplyDialog = !this.showApplyDialog;
    this.examId = examId;
  }

  onApplyConfirmed() {
    this._examService.applyForExam(this.studentUsername, this.examId).subscribe(
      response => [this.getExamsByCourseAndStudent(this.courseId, this.studentUsername)],
      error => console.log(error)
    );
    this.showApplyDialog = !this.showApplyDialog;
  }


  // onPostExam() {
  //   this.newExam.date = this.newDate;
  //   this._examService.createNewExam(this.newExam).subscribe(
  //     response => [this.exams.push(response), this.resetAddForm()],
  //     error => console.log(error)
  //   );
  // }

  // onRemoveExam(id) {
  //   this.showRemoveDialog = !this.showRemoveDialog;
  //   this.newExam.examId = id;
  // }


  

  // onGetById(id: number) {
  //   this._examService.getOne(id)
  //     .subscribe(
  //       (response: any) => this.onPopulate(response.body.date, response.body.active),
  //       error => console.log(error)
  //     );
  // }

  // onPopulate(date: string, active: boolean) {
  //   this.newExam.date = date;
  //   this.newExam.active = true;
  //   this.newExam.courseId = this.courseId;
  // }

  // setNewDate(date: string) {
  //   console.log(date);
  //   this.newDate = date;
  // }

}
