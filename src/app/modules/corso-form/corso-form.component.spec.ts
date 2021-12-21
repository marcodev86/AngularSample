import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CorsoFormComponent } from './corso-form.component';

describe('CorsoFormComponent', () => {
  let component: CorsoFormComponent;
  let fixture: ComponentFixture<CorsoFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CorsoFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CorsoFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
