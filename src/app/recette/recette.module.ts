import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RecetteComponent } from './components/recette/recette.component';
import {RecetteRoutingModule} from './recette-routing.module';
import { RecetteFormComponent } from './components/recette-form/recette-form.component';



@NgModule({
  declarations: [
    RecetteComponent,
    RecetteFormComponent,
  ],
  imports: [
    CommonModule,
    RecetteRoutingModule,
  ],
  exports: [
    RecetteRoutingModule,
  ],
  entryComponents: [
    RecetteComponent,
  ]
})
export class RecetteModule { }
