import { Component, OnInit } from '@angular/core';
import { PreExamObligationRecordsService } from './pre-exam-obligation-records.service';

@Component({
  selector: 'app-student-pre-exam-obligation',
  templateUrl: './student-pre-exam-obligation.component.html',
  styleUrls: ['./student-pre-exam-obligation.component.css']
})
export class StudentPreExamObligationComponent implements OnInit {

  constructor(private preExamObligationRecordsService: PreExamObligationRecordsService) { }

  userId: number = 1;
  courseId: number =1;
  total: number = 0;
  preExamORecs=[];

  ngOnInit() {
    this.getPreExamORecByUserIdAndCourseId(this.userId,this.courseId);
  }

  getPreExamORecByUserIdAndCourseId(userId,courseId){
    this.preExamObligationRecordsService.getAllByStudentAndCourse(this.userId,this.courseId).subscribe(
      (response) => (this.preExamORecs = response.body),
      (error) => console.log(error)
    );
  }

}
