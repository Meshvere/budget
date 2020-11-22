import {NgModule} from '@angular/core';
import {RouterModule,Routes} from '@angular/router';
import {RedirectToComponent} from './shared/components/redirectTo.component';


const routes: Routes = [
  {
      path: '', children: [
          { path: 'summary',  data: { title: 'Bilan' }, loadChildren: './summary/summary.module#SummaryModule' },
          { path: 'income',  data: { title: 'Recette' }, loadChildren: './income/income.module#IncomeModule' },
          { path: 'outcome',  data: { title: 'Dépense' }, loadChildren: './outcome/outcome.module#OutcomeModule' },
          { path: 'refund',  data: { title: 'Remboursement' }, loadChildren: './refund/refund.module#RefundModule' },
          { path: 'food-ticket',  data: { title: 'Tickets resto' }, loadChildren: './food-ticket/food-ticket.module#FoodTicketModule' },
          { path: 'saving',  data: { title: 'Epargne' }, loadChildren: './saving/saving.module#SavingModule' },
          { path: 'import',  data: { title: 'Import' }, loadChildren: './import-data/import-data.module#ImportDataModule' },

          { path: '**', component: RedirectToComponent, data: { to: '/summary' } }
      ]
  }
];

@NgModule({
    imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })], // todo => , {preloadingStrategy: CustomPreloadingStrategy}
    exports: [RouterModule]
})
export class AppRoutingModule { }
