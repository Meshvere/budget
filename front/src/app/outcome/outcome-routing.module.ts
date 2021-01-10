import {NgModule} from '@angular/core';
import {RouterModule,Routes} from '@angular/router';
import {OutcomeFormComponent} from './components/outcome-form/outcome-form.component';
import {OutcomeComponent} from './components/outcome/outcome.component';


const routes: Routes = [
    {
        path: '', children: [
            { path: 'add',  data: { action: 'add' }, component: OutcomeFormComponent },
            { path: ':id',  data: { action: 'edit' }, component: OutcomeFormComponent },
            { path: '**', component: OutcomeComponent},
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class OutcomeRoutingModule { }
