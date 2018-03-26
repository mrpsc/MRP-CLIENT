import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DiagnosManagementComponent } from './diagnos-management.component';

describe('DiagnosManagementComponent', () => {
  let component: DiagnosManagementComponent;
  let fixture: ComponentFixture<DiagnosManagementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DiagnosManagementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DiagnosManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
