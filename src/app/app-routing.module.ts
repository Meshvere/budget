import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {RedirectToComponent} from './shared/components/redirectTo.component';


const routes: Routes = [
  {
      path: '', children: [
          { path: 'bilan',  data: { title: 'Bilan' }, loadChildren: './bilan/bilan.module#BilanModule' },
          { path: 'recette',  data: { title: 'Recette' }, loadChildren: './recette/recette.module#RecetteModule' },
          { path: 'depense',  data: { title: 'Dépense' }, loadChildren: './depense/depense.module#DepenseModule' },
          { path: 'remboursement',  data: { title: 'Remboursement' }, loadChildren: './remboursement/remboursement.module#RemboursementModule' },
          { path: 'ticket-resto',  data: { title: 'Tickets resto' }, loadChildren: './ticket-resto/ticket-resto.module#TicketRestoModule' },

          { path: '**', component: RedirectToComponent, data: { to: '/bilan' } }
      ]
  }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)], // todo => , {preloadingStrategy: CustomPreloadingStrategy}
    exports: [RouterModule]
})
export class AppRoutingModule { }
