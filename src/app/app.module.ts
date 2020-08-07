import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {SharedModule} from './shared/shared.module';
import {BilanModule} from './bilan/bilan.module';
import {RecetteModule} from './recette/recette.module';

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
        BilanModule,
        RecetteModule,
    ],
    exports: [
        SharedModule,
        BilanModule,
        RecetteModule,
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {}
