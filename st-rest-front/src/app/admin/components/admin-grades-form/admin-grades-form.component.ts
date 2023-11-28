import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AdminGradesService } from '../../services/admin-grades.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-admin-grades-form',
  templateUrl: './admin-grades-form.component.html',
  styleUrls: ['./admin-grades-form.component.css']
})
export class AdminGradesFormComponent {
  public title: string = "Crea un curso"
  public descripcion: string = "";
  public gradeForm!: FormGroup;

  constructor(private formBuilder: FormBuilder,
    private adminGradesService: AdminGradesService,
    private location: Location) {
  }

  ngOnInit(): void {
    this.gradeForm = this.formBuilder.group({
      descripcion: ['', [Validators.required, Validators.minLength(2)]]
    });
  }

  onAdd(): void {
    if (this.gradeForm.valid) {
      const gradePayload = this.gradeForm.value;
      this.adminGradesService.addGrade(gradePayload)
        .subscribe(() => this.location.back())
    }
    else {
      Object.keys(this.gradeForm.controls).forEach(field => {
        const control = this.gradeForm.get(field);
        control?.markAsTouched({ onlySelf: true });
      });
    }
  }
}
