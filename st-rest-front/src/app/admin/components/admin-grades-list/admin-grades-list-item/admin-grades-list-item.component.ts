import { Component, Input } from '@angular/core';
import { IGrade } from 'src/interfaces/IGrade';
import { AdminGradesService } from '../../../services/admin-grades.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-admin-grades-list-item',
  templateUrl: './admin-grades-list-item.component.html',
  styleUrls: ['./admin-grades-list-item.component.css']
})
export class AdminGradesListItemComponent {
  @Input()
  public grade!: IGrade;

  constructor(private adminGradesService: AdminGradesService,
    private location: Location) { }

  delete() {
    this.adminGradesService.deleteGrade(this.grade.id)
      .subscribe(() => {
        console.log('deleted grade');
      });
  }

  edit(): void {
    if (this.grade) {
      console.log(this.grade)
      this.adminGradesService.updateGrade(this.grade)
        .subscribe(grade => this.grade = grade);
    }
  }
}
