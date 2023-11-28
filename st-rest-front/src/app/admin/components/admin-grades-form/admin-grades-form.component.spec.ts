import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminGradesFormComponent } from './admin-grades-form.component';

describe('AdminGradesFormComponent', () => {
  let component: AdminGradesFormComponent;
  let fixture: ComponentFixture<AdminGradesFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdminGradesFormComponent]
    });
    fixture = TestBed.createComponent(AdminGradesFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
