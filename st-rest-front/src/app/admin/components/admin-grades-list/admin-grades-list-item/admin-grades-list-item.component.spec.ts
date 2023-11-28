import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminGradesListItemComponent } from './admin-grades-list-item.component';

describe('AdminGradesListItemComponent', () => {
  let component: AdminGradesListItemComponent;
  let fixture: ComponentFixture<AdminGradesListItemComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdminGradesListItemComponent]
    });
    fixture = TestBed.createComponent(AdminGradesListItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
