import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfessoreComponent } from './professore.component';

describe('ProfessoreComponent', () => {
  let component: ProfessoreComponent;
  let fixture: ComponentFixture<ProfessoreComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProfessoreComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfessoreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
