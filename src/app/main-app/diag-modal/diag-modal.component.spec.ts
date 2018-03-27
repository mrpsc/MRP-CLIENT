import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DiagModalComponent } from './diag-modal.component';

describe('DiagModalComponent', () => {
  let component: DiagModalComponent;
  let fixture: ComponentFixture<DiagModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DiagModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DiagModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
