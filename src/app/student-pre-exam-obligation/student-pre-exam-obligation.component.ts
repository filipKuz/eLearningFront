import { Component, OnInit, Input } from '@angular/core';
import { PreExamObligationRecordsService } from './pre-exam-obligation-records.service';

@Component({
  selector: 'app-student-pre-exam-obligation',
  templateUrl: './student-pre-exam-obligation.component.html',
  styleUrls: ['./student-pre-exam-obligation.component.css']
})
export class StudentPreExamObligationComponent implements OnInit {

  constructor(private preExamObligationRecordsService: PreExamObligationRecordsService) { }

  @Input() userId: number;
  @Input() courseId: number;
  total: number = 0;
  totalMax: number = 0;
  preExamORecs=[];

  ngOnInit() {
    this.getPreExamORecByUserIdAndCourseId(this.userId,this.courseId);
  }

  getPreExamORecByUserIdAndCourseId(userId,courseId){
    this.preExamObligationRecordsService.getAllByStudentAndCourse(this.userId,this.courseId).subscribe(
      (response) => (this.preExamORecs = response.body ,  this.onCalculateMax()),
      (error) => console.log(error)
    );
  }

  onCalculateMax(){
    this.preExamORecs.forEach(element => {
      this.total += element.points;
      this.totalMax += element.maxPoints;
    });
  }

}
