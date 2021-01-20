import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {PelletsFormComponent} from './components/pellets-form/pellets-form.component';
import {PelletsComponent} from './components/pellets/pellets.component';

const routes: Routes = [
    {
        path: '', children: [
            { path: 'add',  data: { action: 'add' }, component: PelletsFormComponent },
            { path: ':id',  data: { action: 'edit' }, component: PelletsFormComponent },
            { path: '**', component: PelletsComponent},
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class PelletsRoutingModule { }
