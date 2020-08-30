import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {OutcomeRoutingModule} from './outcome-routing.module';
import {SharedModule} from '../shared/shared.module';
import {OutcomeComponent} from './components/outcome/outcome.component';
import {OutcomeFormComponent} from './components/outcome-form/outcome-form.component';



@NgModule({
    declarations: [
        OutcomeComponent,
        OutcomeFormComponent,
    ],
    imports: [
        CommonModule,
        OutcomeRoutingModule,
        SharedModule,
    ],
    exports: [
        OutcomeRoutingModule,
        OutcomeComponent,
        OutcomeFormComponent,
    ],
    entryComponents: [
        OutcomeComponent,
        OutcomeFormComponent,
    ]
})
export class OutcomeModule { }
