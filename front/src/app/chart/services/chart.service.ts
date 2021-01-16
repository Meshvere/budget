import { Injectable } from '@angular/core';
import {Chart} from '../models/chart';

@Injectable({
  providedIn: 'root'
})
export class ChartService {
    constructor() { }

    public static convertToChartLine(datas:any[], x:string, y:string, type:string = Chart.CHART_BAR):Chart {
        let chartLine:Chart = new Chart({type: type});

        datas.forEach(d => {
            chartLine.x.push(d[x]);
            chartLine.y.push(d[y]);
        });

        return chartLine;
    }
}
