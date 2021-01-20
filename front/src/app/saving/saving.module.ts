import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {SharedModule} from '../shared/shared.module';
import {SavingFormComponent} from './components/saving-form/saving-form.component';
import {SavingComponent} from './components/saving/saving.component';
import {SavingRoutingModule} from './saving-routing.module';

@NgModule({
    declarations: [
        SavingComponent,
        SavingFormComponent,
    ],
    imports: [
        CommonModule,
        SavingRoutingModule,
        SharedModule,
    ],
    exports: [
        SavingRoutingModule,
    ],
    entryComponents: [
        SavingComponent,
        SavingFormComponent,
    ]
})
export class SavingModule { }
