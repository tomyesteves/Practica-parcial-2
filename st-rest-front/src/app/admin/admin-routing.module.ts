import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainLayoutPageComponent } from '../shared/pages/main-layout-page/main-layout-page.component';
import { AdminGradesListComponent } from './components/admin-grades-list/admin-grades-list.component';
import { AdminGradesFormComponent } from './components/admin-grades-form/admin-grades-form.component';

const routes: Routes = [
  { path: '', redirectTo: '/grades', pathMatch: 'full' },
  { path: 'grades', component: AdminGradesListComponent },
  { path: 'form', component: AdminGradesFormComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
