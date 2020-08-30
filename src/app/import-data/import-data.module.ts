import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {SharedModule} from '../shared/shared.module';
import {ImportDataComponent} from './components/import-data/import-data.component';
import {ImportDataRoutingModule} from './import-data-routing.module';

@NgModule({
    declarations: [
        ImportDataComponent,
    ],
    imports: [
        CommonModule,
        ImportDataRoutingModule,
        SharedModule,
    ],
    exports: [
        ImportDataRoutingModule,
    ],
    entryComponents: [
        ImportDataComponent,
    ]
})
export class ImportDataModule { }
