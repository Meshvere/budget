import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {SharedModule} from '../shared/shared.module';
import {IncomeFormComponent} from './components/income-form/income-form.component';
import {IncomeComponent} from './components/income/income.component';
import {IncomeRoutingModule} from './income-routing.module';

@NgModule({
  declarations: [
    IncomeComponent,
    IncomeFormComponent,
  ],
  imports: [
    CommonModule,
    IncomeRoutingModule,
    SharedModule,
  ],
  exports: [
    IncomeRoutingModule,
  ],
  entryComponents: [
    IncomeComponent,
  ]
})
export class IncomeModule { }
