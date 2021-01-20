import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {SharedModule} from '../shared/shared.module';
import {TableModule} from '../table/table.module';
import {SummaryComponent} from './components/summary/summary.component';
import {SummaryRoutingModule} from './summary-routing.module';

@NgModule({
    declarations: [
    SummaryComponent
],
    imports: [
        CommonModule,
        SummaryRoutingModule,
        SharedModule,
        TableModule,
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
