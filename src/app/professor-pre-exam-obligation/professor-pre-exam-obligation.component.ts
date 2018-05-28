import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { PreExamObligationervice } from './pre-exam-obligation.service';
import { PreExamOTypeService } from '../pre-exam-o-type/pre-exam-o-type.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-professor-pre-exam-obligation',
  templateUrl: './professor-pre-exam-obligation.component.html',
  styleUrls: ['./professor-pre-exam-obligation.component.css']
})
export class ProfessorPreExamObligationComponent implements OnInit {

  constructor(private preExamObligationService: PreExamObligationervice,
              private typeService: PreExamOTypeService) { }

  preExamObligations=[];
  types=[];
  newPreExamObligation={
    preExamOId:0,
    name:"",
    active:true,
    preExamOTypeId:0,
    maxPoints:0,
    courseId:0
    };

  showDialog: boolean = false;
  showEditDialog: boolean = false;
  showRemoveDialog: boolean = false;
  showSetDateDialog: boolean = false;
  actionForModal = "";
  model;

  @Input() userId: number;
  @Input() courseId: number;

  @ViewChild('f') addObligationForm: NgForm;
  @ViewChild('fe') editObligationForm: NgForm;
  @ViewChild('fs') setObligationDateForm: NgForm;

  ngOnInit() {
    this.newPreExamObligation.courseId=this.courseId;
    this.getPreExamObligationByCourseId(this.courseId);
  }

  

  getPreExamObligationByCourseId(id:number){
    this.preExamObligationService.getAllByCourse(id).subscribe(
      (response) => (this.preExamObligations = response.body),
      (error) => console.log(error)
    );

  }

  getTypes() {
    this.typeService.getAll().subscribe(
      (response) => (this.types = response.body),
      (error) => console.log(error)
    );
  }

  onRemove(id){
    this.showRemoveDialog =! this.showRemoveDialog;
    this.newPreExamObligation.preExamOId = id;
  }

  onRemoveConfirmed(){
    this.preExamObligationService.changeActive(this.newPreExamObligation.preExamOId).subscribe(
      response => [this.getPreExamObligationByCourseId(this.courseId)],
      error => console.log(error)
    )
    this.showRemoveDialog =! this.showRemoveDialog;
  }

  onGetById(id: number) {
    this.preExamObligationService.getOne(id)
      .subscribe(
      (response: any) => (this.onPopulateJsonType(response.body.name, response.body.maxPoints,response.body.preExamOTypeId)),
      (error) => console.log(error)
      );
    }

    onPopulateJsonType(name: string, maxPoints:number, preExamOTypeId: number) {
      this.newPreExamObligation.name = name;
      this.newPreExamObligation.preExamOTypeId= preExamOTypeId;
      this.newPreExamObligation.maxPoints = maxPoints;

    }

  onEditPEO(id){
    this.resetEditForm();
    this.getTypes();
    this.newPreExamObligation.preExamOId=id;
    this.actionForModal="edit";
    this.onGetById(this.newPreExamObligation.preExamOId);
    this.showEditDialog =! this.showEditDialog;
  }

  onAddObligation(){
    this.resetAddForm();
    this.getTypes();
    this.newPreExamObligation.preExamOId=null;
    this.newPreExamObligation.active=true;
    this.actionForModal = "add";
    this.showDialog =! this.showDialog;
  }

  onSetDate(id){
    this.resetSetObligationDateForm();
    this.newPreExamObligation.preExamOId = id;
    this.actionForModal ="setDate"
    this.showSetDateDialog = !this.showSetDateDialog;
  }

  onPutObligation(){
    this.preExamObligationService.changeObligation(this.newPreExamObligation).subscribe(
      response => [this.getPreExamObligationByCourseId(this.courseId), this.resetEditForm()],
      error => console.log(error)
    )
  }

  onPostNewType() {
    this.preExamObligationService.postNewObligation(this.newPreExamObligation).subscribe(
      response => [this.preExamObligations.push(response), this.resetAddForm()],
      error => console.log(error)
    )
  }

  onSetNewDate(){
    if (this.model.month <= 9) {
      this.model.month = "0" + this.model.month;
    }
    if (this.model.day <= 9) {
      this.model.day = "0" + this.model.day;
    }
    console.log(this.model);
    this.preExamObligationService.setObligationDate(this.newPreExamObligation.preExamOId, this.model).subscribe(
      error => console.log(error)
    )
  }

  onSubmit() {
    if (this.actionForModal === 'edit') {
      this.onPutObligation();
      this.resetEditForm();
      this.showEditDialog = !this.showEditDialog;
    }
    if(this.actionForModal === 'add'){
      this.onPostNewType();
      this.resetAddForm();
      this.showDialog =! this.showDialog;
    }
    if(this.actionForModal === 'setDate'){
      this.onSetNewDate();
      this.resetSetObligationDateForm();
      this.showSetDateDialog = !this.showSetDateDialog;
    }
    
  }

  


  resetAddForm() {
    this.addObligationForm.resetForm();
  }

  resetEditForm(){
    this.editObligationForm.resetForm();
  }

  resetSetObligationDateForm(){
    this.setObligationDateForm.resetForm();
  }
}
