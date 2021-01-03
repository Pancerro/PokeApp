import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { StarterPageComponent } from './starter-page/starter-page.component';


const routes: Routes = [
  { path: '', redirectTo: '/starter-page', pathMatch: 'full' },
  { path: 'starter-page', component: StarterPageComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
