import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentPreExamObligationComponent } from './student-pre-exam-obligation.component';

describe('StudentPreExamObligationComponent', () => {
  let component: StudentPreExamObligationComponent;
  let fixture: ComponentFixture<StudentPreExamObligationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StudentPreExamObligationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StudentPreExamObligationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
