import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { UserComponent } from './user/user.component';
import { UserService } from './user/user.service';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { DepartmentComponent } from './department/department.component';
import { DepartmentService } from './department/department.service';
import { AuthorizationComponent } from './authorization/authorization.component';
import { AuthorizationService } from './authorization/authorization.service';
import { TokenInterceptorService } from './authorization/token-interceptor.service';
import { StudentPreExamObligationComponent } from './student-pre-exam-obligation/student-pre-exam-obligation.component';
import { ProfessorPreExamObligationComponent } from './professor-pre-exam-obligation/professor-pre-exam-obligation.component';
import { ProfessorPreExamObligationRecordsComponent } from './professor-pre-exam-obligation-records/professor-pre-exam-obligation-records.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { JwtInterceptorService } from './authorization/jwt-interceptor.service';
import { PaginationComponent } from './pagination/pagination.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { DialogComponent } from './dialog/dialog.component';
import { RoleService } from './shared/role.service';
import { UserProfileService } from './user-profile/user-profile.service';
import { AuthGuard } from './auth-guard.guard';
import { PreExamObligationRecordsService } from './student-pre-exam-obligation/pre-exam-obligation-records.service';
import { PreExamOTypeComponent } from './pre-exam-o-type/pre-exam-o-type.component';
import { PreExamOTypeService } from './pre-exam-o-type/pre-exam-o-type.service';
import { PreExamObligationervice } from './professor-pre-exam-obligation/pre-exam-obligation.service';
import { EdocumentsComponent } from './edocuments/edocuments.component';
import { EdocumentService } from './edocuments/edocument.service';
import { StudentCourseComponent } from './student-course/student-course.component';
import { ProfessorCourseComponent } from './professor-course/professor-course.component';
import { NavigationComponent } from './navigation/navigation.component';
import { DataService } from './shared/data.service';
import { AdminGuard } from './guard/admin.guard';
import { AllDocumentsComponent } from './all-documents/all-documents.component';
import { AllDocumentsService } from './all-documents/all-documents.service';
import { ExamService } from './shared/exam.service';
import { ProfessorTypeComponent } from './professor-type/professor-type.component';
import { ProfessorTypeService } from './professor-type/professor_type.service';
import { PaymentsComponent } from './payments/payments.component';
import { PaymentsService } from './payments/payments.service';
import { StudentPaymentsComponent } from './student-payments/student-payments.component';
import { StudentPaymentsService } from './student-payments/student_payments.service';
import { CourseComponent } from './course/course.component';
import { CourseService } from './course/course.service';
import { ProfessorExamRecordsComponent } from './professor-exam-records/professor-exam-records.component';
import { ExamRecordsService } from './shared/examRecordsService';
import { ProfGuard } from './guard/prof.guard';
import { CoursesComponent } from './courses/courses.component';

const routes: Routes = [
  /* {
    path: '',
    redirectTo: '/user-login',
    pathMatch: 'full'
  }, */
  {
    path: 'login',
    component: AuthorizationComponent
  },
  {
    path: 'users',
    component: UserComponent,
    canActivate: [AuthGuard, AdminGuard]
  },
  {
    path: 'all-documents',
    component: AllDocumentsComponent,
    canActivate: [AuthGuard, AdminGuard ]
  },
  {
    path: 'profile/:id',
    component: UserProfileComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'documents/:id',
    component: EdocumentsComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'preExamOTypes',
    component: PreExamOTypeComponent,
    canActivate: [AuthGuard, AdminGuard || ProfGuard]
  },
  {
    path: "professorCourses",
    component: ProfessorCourseComponent
  },
  {
    path: "professor_types",
    component: ProfessorTypeComponent
  },
  {
    path: "payments",
    component: PaymentsComponent
  },
  {
    path: "student_payments",
    component: PaymentsComponent
  },
  {
    path: "department",
    component: DepartmentComponent,
    canActivate: [AuthGuard , AdminGuard]
  },
  {
    path: "course",
    component: CourseComponent,
    canActivate: [AuthGuard]
  },
  {
    path: "courses",
    component: CoursesComponent,
    canActivate: [AuthGuard]
  }
];

@NgModule({
  declarations: [
    AppComponent,
    UserComponent,
    AuthorizationComponent,
    DepartmentComponent,
    StudentPreExamObligationComponent,
    ProfessorPreExamObligationComponent,
    ProfessorPreExamObligationRecordsComponent,
    UserProfileComponent,
    PaginationComponent,
    DialogComponent,
    PreExamOTypeComponent,
    EdocumentsComponent,
    StudentCourseComponent,
    ProfessorCourseComponent,
    NavigationComponent,
    AllDocumentsComponent,
    ProfessorTypeComponent,
    PaymentsComponent,
    StudentPaymentsComponent,
    ProfessorExamRecordsComponent,
    CourseComponent,
    CoursesComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(routes), NgbModule.forRoot()
  ],
  providers: [UserService, DepartmentService, AuthorizationService, TokenInterceptorService,
    JwtInterceptorService, PreExamObligationRecordsService, PreExamOTypeService, PreExamObligationervice, CourseService,
    ExamService, ProfessorTypeService, PaymentsService, ExamService, ExamRecordsService, StudentPaymentsService, ProfGuard, {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptorService,
      multi: true
    }, {
      provide: HTTP_INTERCEPTORS,
      useClass: JwtInterceptorService,
      multi: true
    }, RoleService, UserProfileService, AuthGuard, EdocumentService, DataService, AdminGuard,AllDocumentsService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
