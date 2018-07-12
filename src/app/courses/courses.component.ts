import { Component, OnInit, Input } from '@angular/core';
import { RouterLink, ActivatedRoute } from '@angular/router';
import { AuthorizationService } from '../authorization/authorization.service';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.css']
})
export class CoursesComponent implements OnInit {

  id: number;
  private sub: any;

  constructor(
    private route: ActivatedRoute,
    private auth:AuthorizationService) {  }


  @Input() username: string;
  @Input() courseId: number;

  ngOnInit() {
    this.getCourseById()
  }


  isUserAdmin() {
    if (this.auth.getRoles(this.auth.getToken()).includes("ROLE_ADMIN")) {
      return true;
    } else {
      return false;
    }
  }
  isUserProf() {
    if (this.auth.getRoles(this.auth.getToken()).includes("ROLE_PROFESSOR")) {
      return true;
    } else {
      return false;
    }
  }
  isUserStudent() {
    if (this.auth.getRoles(this.auth.getToken()).includes("ROLE_STUDENT")) {
      return true;
    } else {
      return false;
    }
  }

  getCourseById() {
    this.sub = this.route.params.subscribe(params => {
      this.id = +params['id']; // (+) converts string 'id' to a number      
    });
  }


}
