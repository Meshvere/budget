import {NgModule} from '@angular/core';
import {RouterModule,Routes} from '@angular/router';
import {SavingFormComponent} from './components/saving-form/saving-form.component';
import {SavingComponent} from './components/saving/saving.component';


const routes: Routes = [
    {
        path: '', children: [
            { path: ':id', component: SavingFormComponent },
            { path: '**', component: SavingComponent}
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class SavingRoutingModule { }
