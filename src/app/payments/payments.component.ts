import { Component, OnInit , ViewChild} from '@angular/core';
import { PaymentsService } from './payments.service';
import { NgForm } from '@angular/forms';
import { UserService } from '../user/user.service';

@Component({
  selector: 'app-payments',
  templateUrl: './payments.component.html',
  styleUrls: ['./payments.component.css']
})
export class PaymentsComponent implements OnInit {

  constructor(private paymentsService:PaymentsService , private userService:UserService) { }

  payments = [];
  students = [];

  newPayment = {
    paymentId: 0,
    description: "",
    active: true,
    value: 0,
    studentId:0,
  };

  showDialog: boolean = false;

  showEditDialog: boolean = false;
  showRemoveDialog: boolean = false;
  actionForModal="";

  @ViewChild('f') addUserForm: NgForm;
  @ViewChild('fe') editPaymentForm: NgForm;

  
  ngOnInit() {
    this.getAllPayments();
  }

  getAllPayments(){
    this.paymentsService.getAll().subscribe(
      (response) => (this.payments = response.body),
    (error) => console.log(error)
  );
  }

  postNewPayment() {
    console.log(this.newPayment.studentId);
    this.newPayment.studentId = this.newPayment.studentId[0];
    this.paymentsService.postNewType(this.newPayment).subscribe(
      response => [this.payments.push(response), this.resetAddForm()],
      error => console.log(error)
    );
    this.showDialog =! this.showDialog;
  }

  resetAddForm() {
    this.addUserForm.resetForm();
  }

  getStudents() {
    this.userService.getAllForPayments().subscribe(
      response => this.students = response,
      error => console.log(error)
    );
  }

  onPopulateJsonType(description: string , value:any , studentId:number) {
    this.newPayment.description = description;
    this.newPayment.value = value;
    this.newPayment.studentId = studentId;
  }

  onGetById(id: number) {
    this.paymentsService.getOne(id)
      .subscribe(
      (response: any) => (this.onPopulateJsonType(response.body.description ,
         response.body.value,  response.body.studentId)),
      (error) => console.log(error)
      );
    }

  onEditPayment(id){
    this.resetEditForm();
    this.newPayment.paymentId=id;
    console.log(id);
    this.actionForModal="edit";
    this.onGetById(this.newPayment.paymentId);
    this.showEditDialog =! this.showEditDialog;
  }

  onPutType(){
    
    console.log(this.newPayment);
    this.paymentsService.editType(this.newPayment).subscribe(
      response => [this.getAllPayments(), this.resetEditForm()],
      error => console.log(error)
    )
  }

  onRemovePayment(id){
    this.showRemoveDialog =! this.showRemoveDialog;
    this.newPayment.paymentId = id;
  }

  onRemoveConfirmed(){
    this.paymentsService.changeActive(this.newPayment.paymentId).subscribe(
      response => [this.getAllPayments()],
      error => console.log(error)
    )
    this.showRemoveDialog =! this.showRemoveDialog;
  }

  resetEditForm(){
    this.editPaymentForm.resetForm();
  }

  onSubmit() {
    if (this.actionForModal === 'edit') {
      this.onPutType();
      this.resetEditForm();
      this.showEditDialog = !this.showEditDialog;
    }
  }

}
