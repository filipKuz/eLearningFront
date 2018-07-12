import { Component, OnInit, Input } from '@angular/core';
import { PreExamObligationRecordsService } from './pre-exam-obligation-records.service';
import { AuthorizationService } from '../authorization/authorization.service';

@Component({
  selector: 'app-student-pre-exam-obligation',
  templateUrl: './student-pre-exam-obligation.component.html',
  styleUrls: ['./student-pre-exam-obligation.component.css']
})
export class StudentPreExamObligationComponent implements OnInit {

  constructor(private preExamObligationRecordsService: PreExamObligationRecordsService,private auth: AuthorizationService) { }

  @Input() courseId: number;
  total: number = 0;
  totalMax: number = 0;
  preExamORecs=[];

  ngOnInit() {
    alert(this.courseId)
    this.getPreExamORecByUserIdAndCourseId(this.courseId);
  }

  getPreExamORecByUserIdAndCourseId(courseId){
    this.preExamObligationRecordsService.getAllByStudentAndCourse(this.auth.getUser(),this.courseId).subscribe(
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