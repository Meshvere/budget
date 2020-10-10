import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {SharedModule} from '../shared/shared.module';
import {IncomeFormComponent} from './components/income-form/income-form.component';
import {IncomeComponent} from './components/income/income.component';
import {IncomeRoutingModule} from './income-routing.module';
import {TableModule} from '../table/table.module';

@NgModule({
    declarations: [
        IncomeComponent,
        IncomeFormComponent,
    ],
    imports: [
        CommonModule,
        IncomeRoutingModule,
        SharedModule,
        TableModule
    ],
    exports: [
        IncomeRoutingModule,
    ],
    entryComponents: [
        IncomeComponent,
        IncomeFormComponent,
    ]
})
export class IncomeModule { }
