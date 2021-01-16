import {ChangeDetectionStrategy, ChangeDetectorRef, Component, Input} from '@angular/core';
import {AbstractComponent} from '../../../shared/models/abstract-component';
import {Chart} from '../../models/chart';

@Component({
  selector: 'chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ChartComponent extends AbstractComponent {
    @Input() public showLegend:boolean = true;
    @Input() public title:string;
    @Input() public chartWidth:number;
    @Input() public chartHeight:number;

    @Input() public data:Chart[] = [];

    public layout:any;

    constructor(
        protected _cd:ChangeDetectorRef,
    ) {
        super(_cd);
    }

    public ngOnInit() {
        super.ngOnInit();

        this.layout = {width: this.chartWidth, height: this.chartHeight, title: this.title, showLegend: this.showLegend};
    }
}
