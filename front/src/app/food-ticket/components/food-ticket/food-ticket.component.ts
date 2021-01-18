import {ChangeDetectionStrategy, ChangeDetectorRef, Component} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {ChartService} from '../../../chart/services/chart.service';
import {AbstractComponent} from '../../../shared/models/abstract-component';
import {FoodTicket, FoodTicketStats} from '../../../shared/models/food-ticket';
import {DataService} from '../../../shared/services/data.service';
import {TableAction, TableActionRouteTo, TableActionRouteToElem} from '../../../table/models/table-action';
import {TableColumn} from '../../../table/models/table-column';
import {Chart} from '../../../chart/models/chart';

@Component({
    selector: 'food-ticket',
    templateUrl: './food-ticket.component.html',
    styleUrls: ['./food-ticket.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FoodTicketComponent extends AbstractComponent {
    public tableColumns:TableColumn[] = [];
    public tableActions:TableAction[] = [];

    public foodTicket:FoodTicket[] = [];
    public foodTicketStats:FoodTicketStats[] = [];

    constructor(
        protected _cd:ChangeDetectorRef,
        private _dataService:DataService,
        private _route:ActivatedRoute,
        private _router:Router,
    ) {
        super(_cd);

        this.tableColumns.push(new TableColumn({label: 'Mois', field:'date', cellType:'month', filter: true}));
        this.tableColumns.push(new TableColumn({label: 'Date', field:'date', cellType:'date'}));
        this.tableColumns.push(new TableColumn({label: 'Montant', field:'amount', cellType:'money'}));
        this.tableColumns.push(new TableColumn({label: 'Commentaire', field:'comment', cellType:'raw'}));

        this.tableActions.push(new TableAction({label: 'Modifier la ligne', icon: 'edit', action:new TableActionRouteTo({route:[
            new TableActionRouteToElem({type:'raw', value: '/food-ticket/'}),
            new TableActionRouteToElem({type:'field', value: 'id'}),
        ]})}));
        this.tableActions.push(new TableAction({label: 'Supprimer la ligne', icon: 'remove'}));
    }

    ngOnInit(): void {
        super.ngOnInit();

        this.addSub = this._dataService.getFoodTickets().subscribe(ft => {
            this.foodTicket = ft;

            this._cd.markForCheck();
        });

        this.addSub = this._dataService.getFoodTicketStats().subscribe(stat => {
            this.foodTicketStats = stat;

            this._cd.markForCheck();
        });
    }

    public addFoodTicket() {
        this._router.navigate(['.', 'add'])
    }

    public getStats():Chart[] {
        return [ChartService.convertToChartLine(this.foodTicketStats, 'month', 'amount', Chart.CHART_WATERFALL)];
    }
}
