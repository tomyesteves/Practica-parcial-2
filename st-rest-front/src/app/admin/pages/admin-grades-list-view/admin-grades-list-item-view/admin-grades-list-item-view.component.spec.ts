import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminGradesListItemViewComponent } from './admin-grades-list-item-view.component';

describe('AdminGradesListItemViewComponent', () => {
  let component: AdminGradesListItemViewComponent;
  let fixture: ComponentFixture<AdminGradesListItemViewComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdminGradesListItemViewComponent]
    });
    fixture = TestBed.createComponent(AdminGradesListItemViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
