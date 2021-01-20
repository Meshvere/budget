import {registerLocaleData} from '@angular/common';
import localeFr from '@angular/common/locales/fr';
import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {FoodTicketModule} from './food-ticket/food-ticket.module';
import {ImportDataModule} from './import-data/import-data.module';
import {IncomeModule} from './income/income.module';
import {OutcomeModule} from './outcome/outcome.module';
import {RefundModule} from './refund/refund.module';
import {SavingModule} from './saving/saving.module';
import {SharedModule} from './shared/shared.module';
import {SummaryModule} from './summary/summary.module';
import { ToastModule } from './toast/toast.module';


registerLocaleData(localeFr, 'fr');
registerLocaleData(localeFr, 'fr-FR');

@NgModule({
    declarations: [
        AppComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        SharedModule,
        ToastModule,
        // SummaryModule,
        // IncomeModule,
        // OutcomeModule,
        // RefundModule,
        // SavingModule,
        // FoodTicketModule,
        // ImportDataModule,
    ],
    exports: [
        SharedModule,
        ToastModule,
        // SummaryModule,
        // IncomeModule,
        // OutcomeModule,
        // RefundModule,
        // SavingModule,
        // FoodTicketModule,
        // ImportDataModule,
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {}
