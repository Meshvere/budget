import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {RedirectToComponent} from './shared/components/redirectTo.component';


const routes: Routes = [
  {
      path: '', children: [
          { path: 'summary',  data: { title: 'Bilan' }, loadChildren: './summary/summary.module#SummaryModule' },
          { path: 'income',  data: { title: 'Income' }, loadChildren: './income/income.module#IncomeModule' },
          { path: 'depense',  data: { title: 'Dépense' }, loadChildren: './depense/depense.module#DepenseModule' },
          { path: 'remboursement',  data: { title: 'Remboursement' }, loadChildren: './remboursement/remboursement.module#RemboursementModule' },
          { path: 'ticket-resto',  data: { title: 'Tickets resto' }, loadChildren: './ticket-resto/ticket-resto.module#TicketRestoModule' },
          { path: 'epargne',  data: { title: 'Epargne' }, loadChildren: './epargne/epargne.module#EpargneModule' },

          { path: '**', component: RedirectToComponent, data: { to: '/summary' } }
      ]
  }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)], // todo => , {preloadingStrategy: CustomPreloadingStrategy}
    exports: [RouterModule]
})
export class AppRoutingModule { }
