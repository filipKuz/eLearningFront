import { Component, OnInit, Input } from '@angular/core';
import { StudentPaymentsService } from './student_payments.service';

@Component({
  selector: 'app-student-payments',
  templateUrl: './student-payments.component.html',
  styleUrls: ['./student-payments.component.css']
})
export class StudentPaymentsComponent implements OnInit {

  @Input() userId: number;
  payments=[];

  constructor(private studentPaymentsService:StudentPaymentsService) { }

  ngOnInit() {
    this.getPaymentsForStudent(this.userId);
  }

  getPaymentsForStudent(userId){
    this.studentPaymentsService.getPaymentsForStudent(this.userId).subscribe(
      (response) => (this.payments = response.body)),
      (error) => console.log(error);
  }

}
