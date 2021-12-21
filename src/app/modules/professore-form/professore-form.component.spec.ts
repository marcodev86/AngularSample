import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfessoreFormComponent } from './professore-form.component';

describe('ProfessoreFormComponent', () => {
  let component: ProfessoreFormComponent;
  let fixture: ComponentFixture<ProfessoreFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProfessoreFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfessoreFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
