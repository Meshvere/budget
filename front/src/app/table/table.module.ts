import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {TableComponent} from './components/table/table.component';
import {SharedModule} from '../shared/shared.module';



@NgModule({
    declarations: [
        TableComponent,
    ],
    imports: [
        CommonModule,
        SharedModule,
    ],
    exports: [
        TableComponent,
        SharedModule,
    ],
    entryComponents: [
        TableComponent,
    ],
    providers: [

    ]
})
export class TableModule { }
