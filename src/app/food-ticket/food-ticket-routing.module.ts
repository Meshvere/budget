import {NgModule} from '@angular/core';
import {RouterModule,Routes} from '@angular/router';
import {FoodTicketFormComponent} from './components/food-ticket-form/food-ticket-form.component';
import {FoodTicketComponent} from './components/food-ticket/food-ticket.component';


const routes: Routes = [
    {
        path: '', children: [
            { path: ':id', component: FoodTicketFormComponent },
            { path: '**', component: FoodTicketComponent}
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class FoodTicketRoutingModule { }
