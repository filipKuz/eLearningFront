import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PreExamOTypeComponent } from './pre-exam-o-type.component';

describe('PreExamOTypeComponent', () => {
  let component: PreExamOTypeComponent;
  let fixture: ComponentFixture<PreExamOTypeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PreExamOTypeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PreExamOTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
