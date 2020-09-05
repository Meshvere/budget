import {NgModule} from '@angular/core';
import {RouterModule,Routes} from '@angular/router';
import {IncomeFormComponent} from './components/income-form/income-form.component';
import {IncomeComponent} from './components/income/income.component';


const routes: Routes = [
    {
        path: '', children: [
            { path: 'add',  data: { action: 'add' }, component: IncomeFormComponent },
            { path: ':id',  data: { action: 'edit' }, component: IncomeFormComponent },
            { path: '**', component: IncomeComponent}
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class IncomeRoutingModule { }
