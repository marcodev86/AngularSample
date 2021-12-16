import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudenteDetailComponent } from './studente-detail.component';

describe('StudenteDetailComponent', () => {
  let component: StudenteDetailComponent;
  let fixture: ComponentFixture<StudenteDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StudenteDetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StudenteDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
