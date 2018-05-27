import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfessorExamRecordsComponent } from './professor-exam-records.component';

describe('ProfessorExamRecordsComponent', () => {
  let component: ProfessorExamRecordsComponent;
  let fixture: ComponentFixture<ProfessorExamRecordsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProfessorExamRecordsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfessorExamRecordsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
