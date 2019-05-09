import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AppCComponent } from './app-c.component';

describe('AppCComponent', () => {
  let component: AppCComponent;
  let fixture: ComponentFixture<AppCComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AppCComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppCComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
