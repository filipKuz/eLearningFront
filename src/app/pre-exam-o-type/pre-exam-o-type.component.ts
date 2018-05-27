import { Component, OnInit, ViewChild } from '@angular/core';
import { PreExamOTypeService } from './pre-exam-o-type.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-pre-exam-o-type',
  templateUrl: './pre-exam-o-type.component.html',
  styleUrls: ['./pre-exam-o-type.component.css']
})
export class PreExamOTypeComponent implements OnInit {

  constructor(private preExamOTypeService: PreExamOTypeService) { }

  preExamOTypes = [];
  newType = {
    preExamObligationTypeId: 0 ,
    name: "",
    active: true
  };
  selectedTypeId:number;

  showDialog: boolean = false;
  showEditDialog: boolean = false;
  showRemoveDialog: boolean = false;
  actionForModal="";

  @ViewChild('f') addTypeForm: NgForm;
  @ViewChild('fe') editTypeForm: NgForm;

  ngOnInit() {
    this.getPreExamOTypes();
  }

  onPopulateJsonType(name: string) {
    this.newType.name = name;
  }

  onGetById(id: number) {
    this.preExamOTypeService.getOne(id)
      .subscribe(
      (response: any) => (this.onPopulateJsonType(response.body.name)),
      (error) => console.log(error)
      );
    }

  getPreExamOTypes(){
    this.preExamOTypeService.getAll().subscribe(
      (response) => (this.preExamOTypes = response.body),
      (error) => console.log(error)
    );
  }

  onPostNewType() {
    this.preExamOTypeService.postNewType(this.newType).subscribe(
      response => [this.preExamOTypes.push(response), this.resetAddForm()],
      error => console.log(error)
    )
  }

  onEditType(id){
    this.resetEditForm();
    this.newType.preExamObligationTypeId=id;
    this.actionForModal="edit";
    this.onGetById(this.newType.preExamObligationTypeId);
    this.showEditDialog =! this.showEditDialog;
  }

  onAddType(){
    this.resetAddForm();
    this.newType.preExamObligationTypeId=null;
    this.newType.active=true;
    this.showDialog =! this.showDialog;
    this.actionForModal = "add";
  }

  resetAddForm() {
    this.addTypeForm.resetForm();
  }

  resetEditForm(){
    this.editTypeForm.resetForm();
  }

  onPutType(){
    this.preExamOTypeService.changeType(this.newType).subscribe(
      response => [this.getPreExamOTypes(), this.resetEditForm()],
      error => console.log(error)
    )
  }

  onRemove(id){
    this.showRemoveDialog =! this.showRemoveDialog;
    this.newType.preExamObligationTypeId = id;
  }

  onRemoveConfirmed(){
    this.preExamOTypeService.changeActive(this.newType.preExamObligationTypeId).subscribe(
      response => [this.getPreExamOTypes()],
      error => console.log(error)
    )
    this.showRemoveDialog =! this.showRemoveDialog;
  }

  onSubmit() {
    if (this.actionForModal === 'edit') {
      this.onPutType();
      this.resetEditForm();
      this.showEditDialog = !this.showEditDialog;
    }
    if(this.actionForModal === 'add'){
      this.onPostNewType();
      this.resetAddForm();
      this.showDialog =! this.showDialog;
    }
  }


}
