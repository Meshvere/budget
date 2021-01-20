import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {SharedModule} from '../shared/shared.module';
import {UiModule} from '../ui/ui.module';
import {RefundFormComponent} from './components/refund-form/refund-form.component';
import {RefundComponent} from './components/refund/refund.component';
import {RefundRoutingModule} from './refund-routing.module';

@NgModule({
    declarations: [
        RefundComponent,
        RefundFormComponent,
    ],
    imports: [
        CommonModule,
        RefundRoutingModule,
        SharedModule,
        UiModule,
    ],
    exports: [
        RefundRoutingModule,
    ],
    entryComponents: [
        RefundComponent,
        RefundFormComponent,
    ]
})
export class RefundModule { }
