import {ChangeDetectionStrategy,ChangeDetectorRef,Component} from '@angular/core';
import {AbstractComponent} from 'src/app/shared/models/abstract-component';
import {Income} from 'src/app/shared/models/income';
import {Outcome} from 'src/app/shared/models/outcome';
import {DataService} from 'src/app/shared/services/data.service';
import {TableAction} from 'src/app/table/models/table-action';
import {TableColumn} from 'src/app/table/models/table-column';
import {ToastService} from 'src/app/ui/services/toast.service';
import {Summary} from 'src/app/shared/models/summary';
import {UtilsService} from '../../../shared/services/utils.service';


@Component({
   selector: 'app-summary',
   templateUrl: './summary.component.html',
   styleUrls: ['./summary.component.scss'],
   changeDetection: ChangeDetectionStrategy.OnPush
})

export class SummaryComponent extends AbstractComponent {
    public tableColumns:TableColumn[] = [];
    public tableActions:TableAction[] = [];

    public summary:Summary[] = [];

    constructor(
        protected _cd:ChangeDetectorRef,
        protected _toastService:ToastService,
        private _dataService:DataService,
        protected _utilsService:UtilsService,
    ) {
        super(_cd, _toastService, _utilsService);

        this.tableColumns.push(new TableColumn({label: 'Mois', field:'date', cellType:'month'}));
        this.tableColumns.push(new TableColumn({label: 'Dépense récurrente', field:'recurrent', cellType:'money'}));
        this.tableColumns.push(new TableColumn({label: 'Dépense', field:'outcome', cellType:'money'}));
        this.tableColumns.push(new TableColumn({label: 'Recette', field:'income', cellType:'money'}));
        this.tableColumns.push(new TableColumn({label: 'Reste fin de mois', field:'income', cellType:'money'}));
        this.tableColumns.push(new TableColumn({label: 'Remboursable Aurélie', field:'refundA', cellType:'money'}));
        this.tableColumns.push(new TableColumn({label: 'Remboursable Stéphane', field:'refundS', cellType:'money'}));
        this.tableColumns.push(new TableColumn({label: 'Tickets resto', field:'foodTicket', cellType:'money'}));
        this.tableColumns.push(new TableColumn({label: 'Epargne au 1er du mois', field:'saving', cellType:'money'}));
    }

    ngOnInit(): void {
        super.ngOnInit();

        this.addSub = this._dataService.summary$.subscribe(ml => {
            this.summary = ml;

            this._cd.markForCheck();
        });
    }

    public calcMonthDate(i:number):Date {
        let curDate:Date = new Date();
        curDate.setMonth(curDate.getMonth() + i);

        return curDate;
    }
}
