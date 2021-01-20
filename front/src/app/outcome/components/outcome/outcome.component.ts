import {ChangeDetectorRef,Component, ChangeDetectionStrategy} from '@angular/core';
import {AbstractComponent} from '../../../shared/models/abstract-component';
import {Outcome} from '../../../shared/models/outcome';
import {DataService} from '../../../shared/services/data.service';
import {TableColumn} from '../../../table/models/table-column';
import {TableAction, TableActionRouteTo, TableActionRouteToElem} from '../../../table/models/table-action';

@Component({
    selector: 'outcome',
    templateUrl: './outcome.component.html',
    styleUrls: ['./outcome.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OutcomeComponent extends AbstractComponent {
    public tableColumnsDaily:TableColumn[] = [];
    public tableColumnsRecurrent:TableColumn[] = [];
    public tableActions:TableAction[] = [];

    public outcome:Outcome[] = [];
    public currentOutcome:Outcome[] = [];
    public recurrentOutcome:Outcome[] = [];

    constructor(
        protected _cd:ChangeDetectorRef,
        private _dataService:DataService,
    ) {
        super(_cd);

        this.tableColumnsDaily.push(new TableColumn({label: 'Mois', field:'date', cellType:'month', filter:true}));
        this.tableColumnsDaily.push(new TableColumn({label: 'Date', field:'date', cellType:'date', sortable: true}));
        this.tableColumnsDaily.push(new TableColumn({label: 'Compte', field:'account', cellType:'raw', filter:true, sortable: true}));
        this.tableColumnsDaily.push(new TableColumn({label: 'Bénéficiaire', field:'recipient', cellType:'raw'}));
        this.tableColumnsDaily.push(new TableColumn({label: 'Objet', field:'label', cellType:'raw', sortable: true}));
        this.tableColumnsDaily.push(new TableColumn({label: 'Montant', field:'amount', cellType:'money', sortable: true}));
        this.tableColumnsDaily.push(new TableColumn({label: 'Encours', field:'end_of_month', cellType:'boolean', filter:true, sortable: true}));
        this.tableColumnsDaily.push(new TableColumn({label: 'Partagé', field:'shared', cellType:'boolean', filter:true}));
        this.tableColumnsDaily.push(new TableColumn({label: 'En attente', field:'waiting', cellType:'boolean', filter:true}));
        this.tableColumnsDaily.push(new TableColumn({label: 'Remboursé', field:'refund', cellType:'boolean', filter:true}));
        this.tableColumnsDaily.push(new TableColumn({label: 'Montant dépensé', field:'amountPaid', cellType:'money'}));
        this.tableColumnsDaily.push(new TableColumn({label: 'Passé sur le compte', field:'on_account', cellType:'boolean', filter:true}));
        this.tableColumnsDaily.push(new TableColumn({label: 'Commentaire', field:'comment', cellType:'raw'}));

        this.tableColumnsRecurrent.push(new TableColumn({label: 'Actif', field:'active', cellType:'boolean'}));
        this.tableColumnsRecurrent.push(new TableColumn({label: 'Jour de prélèvement', field:'day', cellType:'raw', sortable: true}));
        this.tableColumnsRecurrent.push(new TableColumn({label: 'A partir du', field:'startOn', cellType:'date', sortable: true}));
        this.tableColumnsRecurrent.push(new TableColumn({label: 'Jusqu\'au', field:'endOn', cellType:'date', sortable: true}));
        this.tableColumnsRecurrent.push(new TableColumn({label: 'Compte', field:'account', cellType:'raw', sortable: true}));
        this.tableColumnsRecurrent.push(new TableColumn({label: 'Objet', field:'label', cellType:'raw', sortable: true}));
        this.tableColumnsRecurrent.push(new TableColumn({label: 'Montant', field:'amount', cellType:'money', sortable: true}));
        this.tableColumnsRecurrent.push(new TableColumn({label: 'Partagé', field:'shared', cellType:'boolean'}));
        this.tableColumnsRecurrent.push(new TableColumn({label: 'Montant dépensé', field:'amountPaid', cellType:'money'}));

        this.tableActions.push(new TableAction({label: 'Modifier la dépense', icon: 'edit', action:new TableActionRouteTo({route:[
            new TableActionRouteToElem({type:'raw', value: '/outcome/'}),
            new TableActionRouteToElem({type:'field', value: 'id'}),
        ]})}));
        this.tableActions.push(new TableAction({label: 'Supprimer la dépense', icon: 'remove'}));
    }

    ngOnInit(): void {
        super.ngOnInit();

        this.addSub = this._dataService.getOutcomes().subscribe(out => {
            this.outcome = out;

            this._filterOutcome();

            this._cd.markForCheck();
        });
    }

    private _filterOutcome() {
        this.recurrentOutcome = [];
        this.currentOutcome = [];

        for(let curOut of this.outcome) {
            if(curOut.recurrent) {
                this.recurrentOutcome.push(curOut);
            } else {
                this.currentOutcome.push(curOut);
            }
        }
    }
}
