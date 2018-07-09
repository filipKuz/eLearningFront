import { Component, OnInit, ViewChild } from '@angular/core';
import { ProfessorTypeService } from './professor_type.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-professor-type',
  templateUrl: './professor-type.component.html',
  styleUrls: ['./professor-type.component.css']
})
export class ProfessorTypeComponent implements OnInit {

  constructor(private professorTypeService: ProfessorTypeService) { }

  professorTypes = [];
  newProfessorType = {
    professorTypeId: 0 ,
    name: "",
    active: true
  };

  showDialog: boolean = false;
  showEditDialog: boolean = false;
  showRemoveDialog: boolean = false;
  actionForModal="";

  @ViewChild('f') addTypeForm: NgForm;
  @ViewChild('fe') editTypeForm: NgForm;

  ngOnInit() {
    this.getProfessorTypes();
  }

  onPopulateJsonType(name: string) {
    this.newProfessorType.name = name;
  }

  
  onGetById(id: number) {
    this.professorTypeService.getOne(id)
      .subscribe(
      (response: any) => (this.onPopulateJsonType(response.body.name)),
      (error) => console.log(error)
      );
    }

    getProfessorTypes(){
      this.professorTypeService.getAll().subscribe(
        (response) => (this.professorTypes = response.body),
      (error) => console.log(error)
    );
    }

    createProfessorType() {
      this.professorTypeService.postNewType(this.newProfessorType)
          .subscribe(
            response => [this.professorTypes.push(response), this.resetAddForm()],
                error => console.log(error)
              );
  }

  onEditType(id){
    this.resetEditForm();
    this.newProfessorType.professorTypeId=id;
    this.actionForModal="edit";
    this.onGetById(this.newProfessorType.professorTypeId);
    this.showEditDialog =! this.showEditDialog;
  }

  onAddType(){
    this.resetAddForm();
    this.newProfessorType.active=true;
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
    this.professorTypeService.editType(this.newProfessorType).subscribe(
      response => [this.getProfessorTypes(), this.resetEditForm()],
      error => console.log(error)
    )
  }

  onRemove(id){
    this.showRemoveDialog =! this.showRemoveDialog;
    this.newProfessorType.professorTypeId = id;
  }

  onRemoveConfirmed(){
    this.professorTypeService.changeActive(this.newProfessorType.professorTypeId).subscribe(
      response => [this.getProfessorTypes()],
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
      this.createProfessorType();
      this.resetAddForm();
      this.showDialog =! this.showDialog;
    }
  }


}
