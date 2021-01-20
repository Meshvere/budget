import {ChangeDetectionStrategy, ChangeDetectorRef, Component} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {AbstractComponent} from '../../../shared/models/components/abstract-component';
import {Income} from '../../../shared/models/entities/income';
import {DataService} from '../../../shared/services/data.service';
import {TableAction, TableActionRouteTo, TableActionRouteToElem} from '../../../table/models/table-action';
import {TableColumn} from '../../../table/models/table-column';

@Component({
    selector: 'income',
    templateUrl: './income.component.html',
    styleUrls: ['./income.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class IncomeComponent extends AbstractComponent {
    public tableColumns:TableColumn[] = [];
    public tableActions:TableAction[] = [];

    public income:Income[] = [];

    constructor(
        protected _cd:ChangeDetectorRef,
        private _dataService:DataService,
        private _route:ActivatedRoute,
        private _router:Router,
    ) {
        super(_cd);

        this.tableColumns.push(new TableColumn({label: 'Mois', field:'date', cellType:'month', filter: true}));
        this.tableColumns.push(new TableColumn({label: 'Date', field:'date', cellType:'date'}));
        this.tableColumns.push(new TableColumn({label: 'Compte', field:'account', cellType:'raw', filter: true}));
        this.tableColumns.push(new TableColumn({label: 'Objet', field:'label', cellType:'raw'}));
        this.tableColumns.push(new TableColumn({label: 'Montant', field:'amount', cellType:'money', filter:true}));
        this.tableColumns.push(new TableColumn({label: 'Partagé', field:'shared', cellType:'boolean', filter: true}));
        this.tableColumns.push(new TableColumn({label: 'Récurrent', field:'recurrent', cellType:'boolean', filter: true}));
        this.tableColumns.push(new TableColumn({label: 'Du', field:'recurrent_start', cellType:'date', filter: true}));
        this.tableColumns.push(new TableColumn({label: 'Au', field:'recurrent_stop', cellType:'date', filter: true}));
        this.tableColumns.push(new TableColumn({label: 'Montant perçu', field:'amountRecieved', cellType:'money'}));
        this.tableColumns.push(new TableColumn({label: 'Passé sur le compte', field:'on_account', cellType:'boolean', filter: true}));
        this.tableColumns.push(new TableColumn({label: 'En attente', field:'waiting', cellType:'boolean', filter: true}));
        this.tableColumns.push(new TableColumn({label: 'Commentaire', field:'comment', cellType:'raw'}));

        this.tableActions.push(new TableAction({label: 'Modifier la recette', icon: 'edit', action:new TableActionRouteTo({route:[
            new TableActionRouteToElem({type:'raw', value: '/income/'}),
            new TableActionRouteToElem({type:'field', value: 'id'}),
        ]})}));
        this.tableActions.push(new TableAction({label: 'Supprimer la recette', icon: 'remove'}));
    }

    ngOnInit(): void {
        super.ngOnInit();

        this.addSub = this._dataService.getIncomes().subscribe(inc => {
            this.income = inc;

            this._cd.markForCheck();
        });
    }

    public addIncome() {
        this._router.navigate(['.', 'add'])
    }
}
