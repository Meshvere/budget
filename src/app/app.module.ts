import {registerLocaleData} from '@angular/common';
import localeFr from '@angular/common/locales/fr';
import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {IncomeModule} from './income/income.module';
import {SharedModule} from './shared/shared.module';
import {SummaryModule} from './summary/summary.module';
import {UiModule} from './ui/ui.module';


registerLocaleData(localeFr, 'fr');

@NgModule({
    declarations: [
        AppComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        SharedModule,
        UiModule,
        SummaryModule,
        IncomeModule,
    ],
    exports: [
        SharedModule,
        SummaryModule,
        UiModule,
        IncomeModule,
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {}
