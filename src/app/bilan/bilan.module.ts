import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {BilanRoutingModule} from './bilan-routing.module';
import {BilanComponent} from './components/bilan/bilan.component';



@NgModule({
  declarations: [

  BilanComponent],
  imports: [
    CommonModule,
    BilanRoutingModule
  ],
  exports: [
    BilanRoutingModule
  ],
  entryComponents: [
    BilanComponent
  ]
})
export class BilanModule { }
