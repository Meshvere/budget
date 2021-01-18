import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {SharedModule} from '../shared/shared.module';
import {TableModule} from '../table/table.module';
import {ChartModule} from '../chart/chart.module';
import {FoodTicketFormComponent} from './components/food-ticket-form/food-ticket-form.component';
import {FoodTicketComponent} from './components/food-ticket/food-ticket.component';
import {FoodTicketRoutingModule} from './food-ticket-routing.module';
import {FoodTicketService} from './services/food-ticket.service';
import {UiModule} from '../ui/ui.module';

@NgModule({
    declarations: [
        FoodTicketComponent,
        FoodTicketFormComponent,
    ],
    imports: [
        CommonModule,
        FoodTicketRoutingModule,
        SharedModule,
        TableModule,
        ChartModule,
        UiModule,
    ],
    exports: [
        FoodTicketRoutingModule,
    ],
    entryComponents: [
        FoodTicketComponent,
        FoodTicketFormComponent,
    ],
    providers: [
        FoodTicketService,
    ],
})
export class FoodTicketModule { }
