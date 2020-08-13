import {NgModule} from '@angular/core';
import {RouterModule,Routes} from '@angular/router';
import {RecetteFormComponent} from './components/recette-form/recette-form.component';
import {RecetteComponent} from './components/recette/recette.component';


const routes: Routes = [
  {
      path: '', children: [
        { path: ':id', component: RecetteFormComponent },
        { path: '**', component: RecetteComponent}
      ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RecetteRoutingModule { }
