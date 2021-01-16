import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {PlotlyModule} from 'angular-plotly.js';
import * as PlotlyJS from 'plotly.js/dist/plotly.js';
import {ChartComponent} from './components/chart/chart.component';
import {ChartService} from './services/chart.service';


PlotlyModule.plotlyjs = PlotlyJS;

@NgModule({
    declarations: [
        ChartComponent,
    ],
    imports: [
        CommonModule,
        PlotlyModule,
    ],
    exports: [
        ChartComponent,
        PlotlyModule,
    ],
    providers: [
        ChartService,
    ]
})
export class ChartModule { }
