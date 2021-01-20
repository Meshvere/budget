import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ShoppingFormComponent} from './components/shopping-form/shopping-form.component';
import {ShoppingComponent} from './components/shopping/shopping.component';

const routes: Routes = [
    {
        path: '', children: [
            { path: 'add',  data: { action: 'add' }, component: ShoppingFormComponent },
            { path: ':id',  data: { action: 'edit' }, component: ShoppingFormComponent },
            { path: '**', component: ShoppingComponent},
        ]
    }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ShoppingRoutingModule { }
