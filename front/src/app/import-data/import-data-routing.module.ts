import {NgModule} from '@angular/core';
import {RouterModule,Routes} from '@angular/router';
import {ImportDataComponent} from './components/import-data/import-data.component';


const routes: Routes = [
    {
        path: '', children: [
            { path: '**', component: ImportDataComponent}
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ImportDataRoutingModule { }
