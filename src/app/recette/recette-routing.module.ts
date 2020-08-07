import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {RecetteComponent} from './components/recette/recette.component';


const routes: Routes = [
  {
      path: '', component: RecetteComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RecetteRoutingModule { }
