import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {SharedModule} from './shared/shared.module';
import {SummaryModule} from './summary/summary.module';
import {IncomeModule} from './income/income.module';

import { registerLocaleData } from '@angular/common';
import localeFr from '@angular/common/locales/fr';
registerLocaleData(localeFr, 'fr');

@NgModule({
    declarations: [
        AppComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        SharedModule,
        SummaryModule,
        IncomeModule,
    ],
    exports: [
        SharedModule,
        SummaryModule,
        IncomeModule,
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {}
