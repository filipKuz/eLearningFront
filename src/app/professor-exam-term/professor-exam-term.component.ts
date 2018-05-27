import { Component, OnInit, ViewChild } from '@angular/core';
import { ExamService } from '../shared/exam.service';
import { AuthorizationService } from '../authorization/authorization.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-professor-exam-term',
  templateUrl: './professor-exam-term.component.html',
  styleUrls: ['./professor-exam-term.component.css']
})
export class ProfessorExamTermComponent implements OnInit {

  constructor(private _examService: ExamService, private _authorizationService: AuthorizationService) { }

  private exams = [];
  private professorUsername: string;
  private termMonth: number;
  private pageNum = 0;
  private sizeNum = 2;
  private totalPages = 0;
  private searchTerm = '';
  private sortDirection = "asc";
  private isAscending = true;
  private sortParam = "examId";
  private model;

  @ViewChild('f') addExamForm: NgForm;

  ngOnInit() {
    this.getExams();
    this.termMonth = this.getCurrentMonth();
    this.professorUsername = this.getLoggedInProfessorUsername();
  }

  getExams() {
    this._examService.getByProfessorAndTerm(this.professorUsername, this.termMonth, this.pageNum, this.sizeNum, this.sortParam, this.sortDirection, this.searchTerm).subscribe(
      (response) => (this.exams = response.body),
      (error) => console.log(error)
    );
  }

  getCurrentMonth() {
    const date = new Date();
    return date.getMonth() + 1;
  }

  onSort(sortParam: string) {
    this.isAscending = !this.isAscending;
    this.isAscending ? this.sortDirection = "asc" : this.sortDirection = "desc";
    this.sortParam = sortParam;
    this.getExams();
  }

  getLoggedInProfessorUsername() {
    return this._authorizationService.getUser();
  }

  resetAddForm() {
    this.addExamForm.resetForm();
  }
}
