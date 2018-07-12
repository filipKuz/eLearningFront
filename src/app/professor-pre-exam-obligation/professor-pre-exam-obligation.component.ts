import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { PreExamObligationervice } from './pre-exam-obligation.service';
import { PreExamOTypeService } from '../pre-exam-o-type/pre-exam-o-type.service';
import { NgForm } from '@angular/forms';
import { PreExamObligationRecordsService } from '../student-pre-exam-obligation/pre-exam-obligation-records.service';

@Component({
  selector: 'app-professor-pre-exam-obligation',
  templateUrl: './professor-pre-exam-obligation.component.html',
  styleUrls: ['./professor-pre-exam-obligation.component.css']
})
export class ProfessorPreExamObligationComponent implements OnInit {

  constructor(private preExamObligationService: PreExamObligationervice,
    private typeService: PreExamOTypeService,
    private recordsServoce: PreExamObligationRecordsService) { }

  preExamObligations = [];
  preExamObligationsRecords = [];
  types = [];
  newPreExamObligation = {
    preExamOId: 0,
    name: "",
    active: true,
    preExamOTypeId: 0,
    maxPoints: 0,
    courseId: 0
  };

  showDialog: boolean = false;
  showEditDialog: boolean = false;
  showRemoveDialog: boolean = false;
  showSetDateDialog: boolean = false;
  showGradeDialog: boolean = false;
  sortDirection: string = "asc";
  isAscending : boolean = true;
  actionForModal = "";
  sortParam = "date";
  model;

  @Input() userId: number;
  @Input("courseId") courseId: number;

  @ViewChild('f') addObligationForm: NgForm;
  @ViewChild('fe') editObligationForm: NgForm;
  @ViewChild('fs') setObligationDateForm: NgForm;
  @ViewChild('fg') gradeObligationForm: NgForm;

  ngOnInit() {
    this.newPreExamObligation.courseId = this.courseId;
    this.getPreExamObligationByCourseId(this.courseId);
  }

  getPreExamObligationByCourseId(id: number) {
    this.preExamObligationService.getAllByCourse(id).subscribe(
      (response) => (this.preExamObligations = response.body),
      (error) => console.log(error)
    );
  }

  getobligationsRecords(id:number, sortParam: string ,  sortDirection: string){
    this.recordsServoce.getAllByPreExamObligation(id, sortParam, sortDirection).subscribe(
      (response) => (this.preExamObligationsRecords = response.body),
      (error) => console.log(error)
    );
  }

  getTypes() {
    this.typeService.getAll().subscribe(
      (response) => (this.types = response.body),
      (error) => console.log(error)
    );
  }

  onRemove(id) {
    this.showRemoveDialog = !this.showRemoveDialog;
    this.newPreExamObligation.preExamOId = id;
  }

  onRemoveConfirmed() {
    this.preExamObligationService.changeActive(this.newPreExamObligation.preExamOId).subscribe(
      response => [this.getPreExamObligationByCourseId(this.courseId)],
      error => console.log(error)
    );
    this.showRemoveDialog = !this.showRemoveDialog;
  }

  onGetById(id: number) {
    this.preExamObligationService.getOne(id)
      .subscribe(
        (response: any) => (this.onPopulateJsonType(response.body.name, response.body.maxPoints, response.body.preExamOTypeId)),
        (error) => console.log(error)
      );
  }

  onPopulateJsonType(name: string, maxPoints: number, preExamOTypeId: number) {
    this.newPreExamObligation.name = name;
    this.newPreExamObligation.preExamOTypeId = preExamOTypeId;
    this.newPreExamObligation.maxPoints = maxPoints;
  }

  onEditPEO(id) {
    this.resetEditForm();
    this.getTypes();
    this.newPreExamObligation.preExamOId = id;
    this.actionForModal = "edit";
    this.onGetById(this.newPreExamObligation.preExamOId);
    this.showEditDialog = !this.showEditDialog;
  }

  onAddObligation() {
    this.resetAddForm();
    this.getTypes();
    this.newPreExamObligation.preExamOId = null;
    this.newPreExamObligation.active = true;
    this.actionForModal = "add";
    this.showDialog = !this.showDialog;
  }

  onGrade(id) {
    this.resetGradeObligationForm();
    this.getobligationsRecords(id, this.sortParam , this.sortDirection);
    this.newPreExamObligation.preExamOId=id;
    this.actionForModal = "grade";
    this.showGradeDialog = !this.showGradeDialog;
  }

  onPostGrade() {
    this.recordsServoce.gradeRecords(this.preExamObligationsRecords)
      .subscribe(
        response => console.log(response),
        error => console.log(error)
      );
  }

  onSetDate(id) {
    this.resetSetObligationDateForm();
    this.newPreExamObligation.preExamOId = id;
    this.actionForModal = "setDate";
    this.showSetDateDialog = !this.showSetDateDialog;
  }

  onPutObligation() {
    this.preExamObligationService.changeObligation(this.newPreExamObligation).subscribe(
      response => [this.getPreExamObligationByCourseId(this.courseId), this.resetEditForm()],
      error => console.log(error)
    );
  }

  onPostNewType() {
    this.preExamObligationService.postNewObligation(this.newPreExamObligation).subscribe(
      response => [this.preExamObligations.push(response), this.resetAddForm()],
      error => console.log(error)
    );
  }

  onSetNewDate() {
    this.recordsServoce.setObligationDate(this.newPreExamObligation.preExamOId, this.model.year, this.model.month, this.model.day).subscribe(
      error => console.log(error)
    );
  }

  onSubmit() {
    if (this.actionForModal === 'edit') {
      this.onPutObligation();
      this.resetEditForm();
      this.showEditDialog = !this.showEditDialog;
    }
    if (this.actionForModal === 'add') {
      this.onPostNewType();
      this.resetAddForm();
      this.showDialog = !this.showDialog;
    }
    if (this.actionForModal === 'setDate') {
      this.onSetNewDate();
      this.resetSetObligationDateForm();
      this.showSetDateDialog = !this.showSetDateDialog;
    }
    if(this.actionForModal === 'grade'){
      this.onPostGrade();
      this.showGradeDialog = !this.showGradeDialog;
    }
  }

  click(id:number) {
    console.log(id);
  }

  onSort(sortParam: string) {
    this.isAscending = !this.isAscending;
    this.isAscending ? this.sortDirection = "asc" : this.sortDirection = "desc";
    this.sortParam = sortParam;
    this.onGrade(this.newPreExamObligation.preExamOId);
    this.showGradeDialog =! this.showGradeDialog;
  }

  resetAddForm() {
    this.addObligationForm.resetForm();
  }

  resetEditForm() {
    this.editObligationForm.resetForm();
  }

  resetSetObligationDateForm() {
    this.setObligationDateForm.resetForm();
  }

  resetGradeObligationForm() {
    this.gradeObligationForm.resetForm();
  }
}