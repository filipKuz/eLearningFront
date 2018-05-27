import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfessorPreExamObligationComponent } from './professor-pre-exam-obligation.component';

describe('ProfessorPreExamObligationComponent', () => {
  let component: ProfessorPreExamObligationComponent;
  let fixture: ComponentFixture<ProfessorPreExamObligationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProfessorPreExamObligationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfessorPreExamObligationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
