import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminGradesFormViewComponent } from './admin-grades-form-view.component';

describe('AdminGradesFormViewComponent', () => {
  let component: AdminGradesFormViewComponent;
  let fixture: ComponentFixture<AdminGradesFormViewComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdminGradesFormViewComponent]
    });
    fixture = TestBed.createComponent(AdminGradesFormViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
