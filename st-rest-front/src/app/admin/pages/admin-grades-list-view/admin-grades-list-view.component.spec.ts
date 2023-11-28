import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminGradesListViewComponent } from './admin-grades-list-view.component';

describe('AdminGradesListViewComponent', () => {
  let component: AdminGradesListViewComponent;
  let fixture: ComponentFixture<AdminGradesListViewComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdminGradesListViewComponent]
    });
    fixture = TestBed.createComponent(AdminGradesListViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
