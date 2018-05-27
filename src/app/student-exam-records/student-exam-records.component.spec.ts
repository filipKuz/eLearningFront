import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentExamRecordsComponent } from './student-exam-records.component';

describe('StudentExamRecordsComponent', () => {
  let component: StudentExamRecordsComponent;
  let fixture: ComponentFixture<StudentExamRecordsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StudentExamRecordsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StudentExamRecordsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
