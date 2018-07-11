import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfessorTypeComponent } from './professor-type.component';

describe('ProfessorTypeComponent', () => {
  let component: ProfessorTypeComponent;
  let fixture: ComponentFixture<ProfessorTypeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProfessorTypeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfessorTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
