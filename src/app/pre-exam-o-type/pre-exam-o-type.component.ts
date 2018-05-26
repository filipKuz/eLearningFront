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
    name: "",
    active: "true"
  };

  showDialog: boolean = false;

  @ViewChild('f') addTypeForm: NgForm;

  ngOnInit() {
    this.getPreExamOTypes();
  }

  getPreExamOTypes(){
    this.preExamOTypeService.getAll().subscribe(
      (response) => (this.preExamOTypes = response.body, console.log(this.preExamOTypes)),
      (error) => console.log(error)
    );
  }

  postNewType() {
    this.preExamOTypeService.postNewType(this.newType).subscribe(
      response => [this.preExamOTypes.push(response), this.resetAddForm()],
      error => console.log(error)
    )
    this.showDialog = false;
  }

  resetAddForm() {
    this.addTypeForm.resetForm();
  }

}
