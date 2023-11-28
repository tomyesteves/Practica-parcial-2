import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminGradesListComponent } from './components/admin-grades-list/admin-grades-list.component';
import { AdminGradesFormComponent } from './components/admin-grades-form/admin-grades-form.component';
import { AdminGradesListItemComponent } from './components/admin-grades-list/admin-grades-list-item/admin-grades-list-item.component';
import { AdminGradesListViewComponent } from './pages/admin-grades-list-view/admin-grades-list-view.component';
import { AdminGradesFormViewComponent } from './pages/admin-grades-form-view/admin-grades-form-view.component';
import { AdminGradesListItemViewComponent } from './pages/admin-grades-list-view/admin-grades-list-item-view/admin-grades-list-item-view.component';


@NgModule({
  declarations: [
    AdminGradesListComponent,
    AdminGradesFormComponent,
    AdminGradesListItemComponent,
    AdminGradesListViewComponent,
    AdminGradesFormViewComponent,
    AdminGradesListItemViewComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule
  ]
})
export class AdminModule { }
