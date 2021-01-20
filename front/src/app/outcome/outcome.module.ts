import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {SharedModule} from '../shared/shared.module';
import {TableModule} from '../table/table.module';
import {UiModule} from '../ui/ui.module';
import {OutcomeFormComponent} from './components/outcome-form/outcome-form.component';
import {OutcomeComponent} from './components/outcome/outcome.component';
import {RecipientModalComponent} from './components/recipient-modal/recipient-modal.component';
import {OutcomeRoutingModule} from './outcome-routing.module';
import {OutcomeService} from './services/outcome.service';

@NgModule({
    declarations: [
        OutcomeComponent,
        OutcomeFormComponent,
        RecipientModalComponent,
    ],
    imports: [
        CommonModule,
        OutcomeRoutingModule,
        SharedModule,
        TableModule,
        UiModule,
    ],
    exports: [
        OutcomeRoutingModule,
        RecipientModalComponent,
    ],
    entryComponents: [
        OutcomeComponent,
        OutcomeFormComponent,
        RecipientModalComponent,
    ],
    providers: [
        OutcomeService,
    ],
})
export class OutcomeModule { }
