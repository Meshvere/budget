import {NgModule} from '@angular/core';
import {RouterModule,Routes} from '@angular/router';
import {RedirectToComponent} from './shared/components/redirectTo.component';


const routes: Routes = [
  { path: 'summary',  data: { title: 'Bilan', icon:'chartLine' }, loadChildren: './summary/summary.module#SummaryModule' },
  { path: 'income',  data: { title: 'Recette', icon:'moneyCheck' }, loadChildren: './income/income.module#IncomeModule' },
  { path: 'outcome',  data: { title: 'Dépense', icon:'coins' }, loadChildren: './outcome/outcome.module#OutcomeModule' },
//   { path: 'refund',  data: { title: 'Remboursement', icon:'moneyBill' }, loadChildren: './refund/refund.module#RefundModule' },
  { path: 'food-ticket',  data: { title: 'Tickets resto', icon:'utensils' }, loadChildren: './food-ticket/food-ticket.module#FoodTicketModule' },
  { path: 'shopping',  data: { title: 'Courses', icon:'shoppingCart' }, loadChildren: './shopping/shopping.module#ShoppingModule' },
  { path: 'saving',  data: { title: 'Epargne', icon:'piggyBank' }, loadChildren: './saving/saving.module#SavingModule' },
  { path: 'pellets',  data: { title: 'Pellets', icon:'fire' }, loadChildren: () => import('./pellets/pellets.module').then(m => m.PelletsModule) },
//   { path: 'import',  data: { title: 'Import', icon:'fileImport' }, loadChildren: './import-data/import-data.module#ImportDataModule' },

  { path: '**', component: RedirectToComponent, data: { to: '/summary' } }
//   { path: 'shopping', loadChildren: () => import('./shopping/shopping.module').then(m => m.ShoppingModule) }
];

@NgModule({
    imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })], // todo => , {preloadingStrategy: CustomPreloadingStrategy}
    exports: [RouterModule]
})
export class AppRoutingModule { }
