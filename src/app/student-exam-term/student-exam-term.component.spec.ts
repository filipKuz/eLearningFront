import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentExamTermComponent } from './student-exam-term.component';

describe('StudentExamTermComponent', () => {
  let component: StudentExamTermComponent;
  let fixture: ComponentFixture<StudentExamTermComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StudentExamTermComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StudentExamTermComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
