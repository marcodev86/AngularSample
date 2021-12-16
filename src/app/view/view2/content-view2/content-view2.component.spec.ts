import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContentView2Component } from './content-view2.component';

describe('ContentView2Component', () => {
  let component: ContentView2Component;
  let fixture: ComponentFixture<ContentView2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ContentView2Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ContentView2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
