import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InsegnamentoFormComponent } from './insegnamento-form.component';

describe('InsegnamentoFormComponent', () => {
  let component: InsegnamentoFormComponent;
  let fixture: ComponentFixture<InsegnamentoFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InsegnamentoFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InsegnamentoFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
