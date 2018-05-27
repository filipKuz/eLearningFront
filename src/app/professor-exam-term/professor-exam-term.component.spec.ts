import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfessorExamTermComponent } from './professor-exam-term.component';

describe('ProfessorExamTermComponent', () => {
  let component: ProfessorExamTermComponent;
  let fixture: ComponentFixture<ProfessorExamTermComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProfessorExamTermComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfessorExamTermComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
