import {ChangeDetectionStrategy,ChangeDetectorRef,Component} from '@angular/core';
import {AbstractComponent} from 'src/app/shared/models/abstract-component';
import {Income} from 'src/app/shared/models/income';
import {DataService} from 'src/app/shared/services/data.service';
import {TableAction, TableActionRouteTo, TableActionRouteToElem} from 'src/app/table/models/table-action';
import {TableColumn} from 'src/app/table/models/table-column';
import {IconService} from 'src/app/ui/services/icon.service';
import {ToastService} from 'src/app/ui/services/toast.service';
import {Router, ActivatedRoute} from '@angular/router';

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
        protected _toastService:ToastService,
        private _dataService:DataService,
        private _route:ActivatedRoute,
        private _router:Router,
        public icon:IconService,
    ) {
        super(_cd, _toastService);

        this.tableColumns.push(new TableColumn({label: 'Mois', field:'dateMom', cellType:'month'}));
        this.tableColumns.push(new TableColumn({label: 'Date', field:'dateMom', cellType:'date'}));
        this.tableColumns.push(new TableColumn({label: 'Compte', field:'account', cellType:'raw'}));
        this.tableColumns.push(new TableColumn({label: 'Objet', field:'label', cellType:'raw'}));
        this.tableColumns.push(new TableColumn({label: 'Montant', field:'amount', cellType:'money'}));
        this.tableColumns.push(new TableColumn({label: 'Partagé', field:'shared', cellType:'boolean'}));
        this.tableColumns.push(new TableColumn({label: 'Récurrent', field:'recurrent', cellType:'boolean'}));
        this.tableColumns.push(new TableColumn({label: 'Montant perçu', field:'amountRecieved', cellType:'money'}));
        this.tableColumns.push(new TableColumn({label: 'En attente', field:'waiting', cellType:'boolean'}));
        this.tableColumns.push(new TableColumn({label: 'Commentaire', field:'commentaire', cellType:'raw'}));

        this.tableActions.push(new TableAction({label: 'Modifier la recette', icon: 'edit', action:new TableActionRouteTo({route:[
            new TableActionRouteToElem({type:'raw', value: '/income/'}),
            new TableActionRouteToElem({type:'field', value: 'id'}),
        ]})}));
        this.tableActions.push(new TableAction({label: 'Supprimer la recette', icon: 'remove'}));
    }

    ngOnInit(): void {
        super.ngOnInit();

        this.addSub = this._dataService.income$.subscribe(inc => {
            this.income = inc;

            this._cd.markForCheck();
        });
    }

    public addIncome() {
        this._router.navigate(['.', 'add'])
    }
}
