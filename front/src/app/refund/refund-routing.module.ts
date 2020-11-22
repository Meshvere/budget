import {NgModule} from '@angular/core';
import {RouterModule,Routes} from '@angular/router';
import {RefundFormComponent} from './components/refund-form/refund-form.component';
import {RefundComponent} from './components/refund/refund.component';


const routes: Routes = [
    {
        path: '', children: [
            { path: ':id', component: RefundFormComponent },
            { path: '**', component: RefundComponent}
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class RefundRoutingModule { }
