import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {BilanComponent} from './components/bilan/bilan.component';


const routes: Routes = [
  {
      path: '', component: BilanComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BilanRoutingModule { }
