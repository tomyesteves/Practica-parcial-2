import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainLayoutPageComponent } from '../shared/pages/main-layout-page/main-layout-page.component';
import { HomeComponent } from './home/home.component';
import { AboutusComponent } from './aboutus/aboutus.component';

const routes: Routes = [
  { path: 'home', component: MainLayoutPageComponent, children: [{ path: '', component: HomeComponent }] },
  { path: 'aboutus', component: MainLayoutPageComponent, children: [{ path: '', component: AboutusComponent }] },
  {
    path: 'evaluadores', loadChildren: () => import('./../admin/admin.module').then(m => m.AdminModule),
  },
  { path: '', redirectTo: 'home', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainRoutingModule { }
