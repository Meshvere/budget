import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {SummaryRoutingModule} from './summary-routing.module';
import {SummaryComponent} from './components/summary/summary.component';
import {SharedModule} from '../shared/shared.module';

@NgModule({
   declarations: [
   SummaryComponent
],
   imports: [
      CommonModule,
      SummaryRoutingModule,
      SharedModule
   ],
   exports: [
      SummaryRoutingModule
   ],
   entryComponents: [
      SummaryComponent
   ],
   providers: [

   ]
})
export class SummaryModule { }
