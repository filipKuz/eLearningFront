import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { ExamService } from '../shared/exam.service';
import { AuthorizationService } from '../authorization/authorization.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-professor-course',
  templateUrl: './professor-course.component.html',
  styleUrls: ['./professor-course.component.css']
})
export class ProfessorCourseComponent implements OnInit {

  constructor(private _examService: ExamService, private _authService: AuthorizationService) { }

  exams = [];
  course = {};
  professorUsername = "";
  newExam = {
    examId: 0,
    date: "",
    active: true,
    courseId: 0
  };

  showDialog = false;
  showEditDialog = false;
  showRemoveDialog = false;
  actionForModal = "";
  model;
  newDate: string;

  @Input('courseId') courseId: number;

  @ViewChild('addForm') addForm: NgForm;
  @ViewChild('editForm') editForm: NgForm;

  ngOnInit() {
    this.newExam.courseId = this.courseId;
    this.professorUsername = this._authService.getUser();
    this.getExamsByProfessorAndCourse(this.professorUsername, this.courseId);

    // console.log(this.courseId);
    // console.log(this.professorUsername);
  }

  getExamsByProfessorAndCourse(professorUsername: string, courseId: number) {
    this._examService.getByProfessorAndCourse(this.professorUsername, this.courseId).subscribe(
      response => this.exams = response.body,
      error => console.log(error)
    );
  }

  onEditExam(id) {
    this.resetEditForm();
    this.newExam.examId = id;
    this.actionForModal = "edit";
    this.onGetById(this.newExam.examId);

    // this.model = this.newExam.date;
    // console.log(this.model);

    this.showEditDialog = !this.showEditDialog;
  }

  onAddExam() {
    this.resetAddForm();
    this.getExamsByProfessorAndCourse(this.professorUsername, this.courseId);
    this.newExam.active = true;
    this.actionForModal = "add";
    this.showDialog = !this.showDialog;
  }

  onPutExam() {
    if (this.model.month <= 9) {
      this.model.month = "0" + this.model.month;
    }

    if (this.model.day <= 9) {
      this.model.day = "0" + this.model.day;
    }

    this.newExam.date = this.model.year + "-" + this.model.month + "-" + this.model.day;

    this._examService.updateExam(this.newExam).subscribe(
      response => [this.getExamsByProfessorAndCourse(this.professorUsername, this.courseId), this.resetEditForm()],
      error => console.log(error)
    );
  }

  onPostExam() {
    this.newExam.date = this.newDate;
    this._examService.createNewExam(this.newExam).subscribe(
      response => [this.exams.push(response), this.resetAddForm()],
      error => console.log(error)
    );
  }

  onRemoveExam(id) {
    this.showRemoveDialog = !this.showRemoveDialog;
    this.newExam.examId = id;
  }

  onRemoveConfirmed() {
    this._examService.deleteExam(this.newExam.examId).subscribe(
      response => [this.getExamsByProfessorAndCourse(this.professorUsername, this.courseId)],
      error => console.log(error)
    );
    this.showRemoveDialog = !this.showRemoveDialog;
  }

  resetAddForm() {
    this.addForm.resetForm();
  }

  resetEditForm() {
    this.editForm.resetForm();
  }

  onSubmit() {
    if (this.actionForModal === 'edit') {
      console.log(this.newExam);
      this.onPutExam();
      this.resetEditForm();
      this.showEditDialog = !this.showEditDialog;
    }
    if (this.actionForModal === 'add') {
      this.onPostExam();
      this.resetAddForm();
      this.showDialog = !this.showDialog;
    }
  }

  onGetById(id: number) {
    this._examService.getOne(id)
      .subscribe(
        (response: any) => this.onPopulate(response.body.date, response.body.active),
        error => console.log(error)
      );
  }

  onPopulate(date: string, active: boolean) {
    this.newExam.date = date;
    this.newExam.active = true;
    this.newExam.courseId = this.courseId;
  }

  setNewDate(date: string) {
    console.log(date);
    this.newDate = date;
  }
}

