import { Component } from '@angular/core';
import { IGrade } from 'src/interfaces/IGrade';
import { AdminGradesService } from '../../services/admin-grades.service';

@Component({
  selector: 'app-admin-grades-list',
  templateUrl: './admin-grades-list.component.html',
  styleUrls: ['./admin-grades-list.component.css']
})
export class AdminGradesListComponent {
  grades: IGrade[] = [];
  title: string = "Lista de cursos"

  constructor(private adminGradesService: AdminGradesService) { }

  ngOnInit() {
    this.getGrades();
  }

  getGrades() {
    this.adminGradesService.getGrades()
      .subscribe(grades => {
        console.log(grades);
        this.grades = grades;
      });
  }

  getAdminService() {
    return this.adminGradesService;
  }
}
