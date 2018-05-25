import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfessorPreExamObligationRecordsComponent } from './professor-pre-exam-obligation-records.component';

describe('ProfessorPreExamObligationRecordsComponent', () => {
  let component: ProfessorPreExamObligationRecordsComponent;
  let fixture: ComponentFixture<ProfessorPreExamObligationRecordsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProfessorPreExamObligationRecordsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfessorPreExamObligationRecordsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
