import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentExamRecordComponent } from './student-exam-record.component';

describe('StudentExamRecordComponent', () => {
  let component: StudentExamRecordComponent;
  let fixture: ComponentFixture<StudentExamRecordComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StudentExamRecordComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StudentExamRecordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
