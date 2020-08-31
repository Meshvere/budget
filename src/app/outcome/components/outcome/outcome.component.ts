import {ChangeDetectorRef,Component} from '@angular/core';
import {ComponentInit} from '../../../shared/models/component-init';
import {ToastService} from '../../../ui/services/toast.service';
import {Outcome} from 'src/app/shared/models/outcome';
import {DataService} from 'src/app/shared/services/data.service';
import {IconService} from 'src/app/ui/services/icon.service';
import {TableColumn} from 'src/app/table/models/table-column';
import {TableAction, TableActionRouteTo, TableActionRouteToElem} from 'src/app/table/models/table-action';

@Component({
    selector: 'app-outcome',
    templateUrl: './outcome.component.html',
    styleUrls: ['./outcome.component.scss']
})
export class OutcomeComponent extends ComponentInit {
    public tableColumnsDaily:TableColumn[] = [];
    public tableColumnsRecurrent:TableColumn[] = [];
    public tableActions:TableAction[] = [];

    public outcome:Outcome[] = [];

    constructor(
        protected _cd:ChangeDetectorRef,
        protected _toastService:ToastService,
        private _dataService:DataService,
        public icon:IconService,
    ) {
        super(_cd, _toastService);

        this.tableColumnsDaily.push(new TableColumn({label: 'Mois', field:'date', cellType:'month'}));
        this.tableColumnsDaily.push(new TableColumn({label: 'Date', field:'date', cellType:'date'}));
        this.tableColumnsDaily.push(new TableColumn({label: 'Compte', field:'account', cellType:'raw'}));
        this.tableColumnsDaily.push(new TableColumn({label: 'Bénéficiaire', field:'recipient', cellType:'raw'}));
        this.tableColumnsDaily.push(new TableColumn({label: 'Objet', field:'label', cellType:'raw'}));
        this.tableColumnsDaily.push(new TableColumn({label: 'Montant', field:'amount', cellType:'money'}));
        this.tableColumnsDaily.push(new TableColumn({label: 'Encours', field:'end_of_month', cellType:'boolean'}));
        this.tableColumnsDaily.push(new TableColumn({label: 'Partagé', field:'shared', cellType:'boolean'}));
        this.tableColumnsDaily.push(new TableColumn({label: 'En attente', field:'waiting', cellType:'boolean'}));
        this.tableColumnsDaily.push(new TableColumn({label: 'Remboursé', field:'refund', cellType:'boolean'}));
        this.tableColumnsDaily.push(new TableColumn({label: 'Montant dépensé', field:'amountPaid', cellType:'money'}));
        this.tableColumnsDaily.push(new TableColumn({label: 'Passé sur le compte', field:'on_account', cellType:'boolean'}));
        this.tableColumnsDaily.push(new TableColumn({label: 'Commentaire', field:'comment', cellType:'raw'}));

        this.tableColumnsRecurrent.push(new TableColumn({label: 'Mois', field:'date', cellType:'month'}));
        this.tableColumnsRecurrent.push(new TableColumn({label: 'Date', field:'date', cellType:'date'}));
        this.tableColumnsRecurrent.push(new TableColumn({label: 'Compte', field:'account', cellType:'raw'}));
        this.tableColumnsRecurrent.push(new TableColumn({label: 'Objet', field:'label', cellType:'raw'}));
        this.tableColumnsRecurrent.push(new TableColumn({label: 'Montant', field:'amount', cellType:'money'}));
        this.tableColumnsRecurrent.push(new TableColumn({label: 'Partagé', field:'shared', cellType:'boolean'}));
        this.tableColumnsRecurrent.push(new TableColumn({label: 'Montant dépensé', field:'amountPaid', cellType:'money'}));
        this.tableColumnsRecurrent.push(new TableColumn({label: 'Jour de prélèvement', field:'day', cellType:'raw'}));
        this.tableColumnsRecurrent.push(new TableColumn({label: 'A partir du', field:'start_on', cellType:'date'}));
        this.tableColumnsRecurrent.push(new TableColumn({label: 'Jusqu\'au', field:'end_on', cellType:'date'}));
        this.tableColumnsRecurrent.push(new TableColumn({label: 'Actif', field:'active', cellType:'boolean'}));

        this.tableActions.push(new TableAction({label: 'Modifier la dépense', icon: 'edit', action:new TableActionRouteTo({route:[
            new TableActionRouteToElem({type:'raw', value: '/outcome/'}),
            new TableActionRouteToElem({type:'field', value: 'id'}),
        ]})}));
        this.tableActions.push(new TableAction({label: 'Supprimer la dépense', icon: 'remove'}));
    }

    ngOnInit(): void {
        super.ngOnInit();

        this.addSub = this._dataService.outcome$.subscribe(out => {
            this.outcome = out;

            this._cd.markForCheck();
        });
    }

    public filterOutcome(recurrent:boolean):Outcome[] {
        let list:Outcome[] = [];

        for(let curOut of this.outcome) {
            if(curOut.recurrent == recurrent) {
                list.push(curOut);
            }
        }

        return list;
    }
}
