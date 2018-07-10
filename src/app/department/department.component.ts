import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { DepartmentService } from './department.service';

@Component({
  selector: 'app-department',
  templateUrl: './department.component.html',
  styleUrls: ['./department.component.css']
})
export class DepartmentComponent implements OnInit {

  constructor(private departmentService: DepartmentService) { }

  departments = [];
  newDepartment = {
    departmentId: 0 ,
    name: "",
    active: true
  };
  selectedDepartmentId:number;

  showDialog: boolean = false;
  showEditDialog: boolean = false;
  showRemoveDialog: boolean = false;
  actionForModal="";

  @ViewChild('f') addDepartemntForm: NgForm;
  @ViewChild('fe') editDepartemntForm: NgForm;

  ngOnInit() {
    this.getDepartments();
  }

  onPopulateJsonDep(name: string) {
    this.newDepartment.name = name;
  }

  onGetById(id: number) {
    this.departmentService.getOne(id)
      .subscribe(
      (response: any) => (this.onPopulateJsonDep(response.body.name)),
      (error) => console.log(error)
      );
    }

  getDepartments(){
    this.departmentService.getAll().subscribe(
      (response) => (this.departments = response.body),
      (error) => console.log(error)
    );
  }

  onPostNewDep() {
    this.departmentService.postNewDep(this.newDepartment).subscribe(
      response => [this.departments.push(response), this.resetAddForm()],
      error => console.log(error)
    )
  }

  onEditDep(id){
    this.resetEditForm();
    this.newDepartment.departmentId=id;
    this.actionForModal="edit";
    this.onGetById(this.newDepartment.departmentId);
    this.showEditDialog =! this.showEditDialog;
  }

  onAddDep(){
    this.resetAddForm();
    this.newDepartment.departmentId=null;
    this.newDepartment.active=true;
    this.showDialog =! this.showDialog;
    this.actionForModal = "add";
  }

  resetAddForm() {
    this.addDepartemntForm.resetForm();
  }

  resetEditForm(){
    this.editDepartemntForm.resetForm();
  }

  onPutDep(){
    this.departmentService.changeDep(this.newDepartment).subscribe(
      response => [this.getDepartments(), this.resetEditForm()],
      error => console.log(error)
    )
  }

  onRemove(id){
    this.showRemoveDialog =! this.showRemoveDialog;
    this.newDepartment.departmentId = id;
  }

  onRemoveConfirmed(){
    this.departmentService.changeActive(this.newDepartment.departmentId).subscribe(
      response => [this.getDepartments()],
      error => console.log(error)
    )
    this.showRemoveDialog =! this.showRemoveDialog;
  }

  onSubmit() {
    if (this.actionForModal === 'edit') {
      this.onPutDep();
      this.resetEditForm();
      this.showEditDialog = !this.showEditDialog;
    }
    if(this.actionForModal === 'add'){
      this.onPostNewDep();
      this.resetAddForm();
      this.showDialog =! this.showDialog;
    }
  }

  

}
