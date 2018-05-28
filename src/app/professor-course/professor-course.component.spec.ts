import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfessorCourseComponent } from './professor-course.component';

describe('ProfessorCourseComponent', () => {
  let component: ProfessorCourseComponent;
  let fixture: ComponentFixture<ProfessorCourseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProfessorCourseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfessorCourseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
