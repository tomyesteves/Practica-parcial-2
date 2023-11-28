import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminGradesListComponent } from './admin-grades-list.component';

describe('AdminGradesListComponent', () => {
  let component: AdminGradesListComponent;
  let fixture: ComponentFixture<AdminGradesListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdminGradesListComponent]
    });
    fixture = TestBed.createComponent(AdminGradesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
