import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudenteFormComponent } from './studente-form.component';

describe('StudenteFormComponent', () => {
  let component: StudenteFormComponent;
  let fixture: ComponentFixture<StudenteFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StudenteFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StudenteFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
