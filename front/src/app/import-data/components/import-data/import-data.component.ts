import {ChangeDetectorRef, Component} from '@angular/core';
import {AbstractComponent} from '../../../shared/models/abstract-component';
import {Income} from '../../../shared/models/income';
import {Outcome} from '../../../shared/models/outcome';
import {XlsxSheetDataMapping, XlsxSheetDataMappingAssoc} from '../../../shared/models/xlsx-sheet-data';
import {DataService} from '../../../shared/services/data.service';
import {TimeService} from '../../../shared/services/time.service';
import {ImportDataService} from '../../services/import-data.service';

@Component({
    selector: 'app-import-data',
    templateUrl: './import-data.component.html',
    styleUrls: ['./import-data.component.scss']
})
export class ImportDataComponent extends AbstractComponent {
    public dataMapping:XlsxSheetDataMapping[] = [];
    public newOutcomes:Outcome[] = [];
    public newIncomes:Income[] = [];

    constructor(
        protected _cd:ChangeDetectorRef,
        protected _importDataService:ImportDataService,
        protected _dataService:DataService,
    ) {
        super(_cd);

        this.dataMapping.push(new XlsxSheetDataMapping({sheetName:"Dépenses",  mapping:[
            new XlsxSheetDataMappingAssoc({from:'Date', to:'date', type:'date'}),
            new XlsxSheetDataMappingAssoc({from:'Compte', to:'account'}),
            new XlsxSheetDataMappingAssoc({from:'Bénéficiaire', to:'recipient'}),
            new XlsxSheetDataMappingAssoc({from:'Objet', to:'label'}),
            new XlsxSheetDataMappingAssoc({from:'Montant', to:'amount'}),
            new XlsxSheetDataMappingAssoc({from:'Encours', to:'end_of_month', type:'boolean'}),
            new XlsxSheetDataMappingAssoc({from:'Partagé', to:'shared', type:'boolean'}),
            new XlsxSheetDataMappingAssoc({from:'Remboursé', to:'refunded', type:'boolean'}),
            new XlsxSheetDataMappingAssoc({from:'Passé sur le compte', to:'on_account', type:'boolean'}),
            new XlsxSheetDataMappingAssoc({from:'Evol/Remarque', to:'comment'}),
        ]}));

        this.dataMapping.push(new XlsxSheetDataMapping({sheetName:"Prélèv",  mapping:[
            new XlsxSheetDataMappingAssoc({from:'A partir du', to:'start_on', type:'date'}),
            new XlsxSheetDataMappingAssoc({from:'Jusqu\'au', to:'end_on', type:'date'}),
            new XlsxSheetDataMappingAssoc({from:'Nom', to:'label'}),
            new XlsxSheetDataMappingAssoc({from:'Montant', to:'amount'}),
            new XlsxSheetDataMappingAssoc({from:'Commentaire', to:'comment'}),
            new XlsxSheetDataMappingAssoc({from:'Jour', to:'day'}),
        ]}));

        this.dataMapping.push(new XlsxSheetDataMapping({sheetName:"Recettes",  mapping:[
            new XlsxSheetDataMappingAssoc({from:'Date', to:'date', type:'date'}),
            new XlsxSheetDataMappingAssoc({from:'Compte', to:'account'}),
            new XlsxSheetDataMappingAssoc({from:'Objet', to:'label'}),
            new XlsxSheetDataMappingAssoc({from:'Montant', to:'amount'}),
            new XlsxSheetDataMappingAssoc({from:'Partagé', to:'shared', type:'boolean'}),
            new XlsxSheetDataMappingAssoc({from:'Récupéré', to:'on_account', type:'boolean'}),
            new XlsxSheetDataMappingAssoc({from:'Attente', to:'comment'}),
        ]}));
    }

    public ngOnInit() {
        this.addSub = this._importDataService.loadXlsxFile('assets/Budget.xlsx').subscribe(worksheet => {
            for(let mapping of this.dataMapping) {
                for(let sheet of worksheet) {
                    if(sheet.sheetName == mapping.sheetName) {
                        if(mapping.sheetName == 'Dépenses') {
                            for(let row of sheet.affectedRows) {
                                let mappedRow:any = {};

                                for(let map of mapping.mapping) {
                                    mappedRow[map.to] = this._transformData(map, row[map.from]);
                                }

                                this.newOutcomes.push(new Outcome(mappedRow));
                            }
                        } else if(mapping.sheetName == 'Prélèv') {
                            for(let row of sheet.affectedRows) {
                                let mappedRow:any = {};

                                for(let map of mapping.mapping) {
                                    mappedRow[map.to] = this._transformData(map, row[map.from]);
                                }

                                mappedRow.recurrent = true;

                                this.newOutcomes.push(new Outcome(mappedRow));
                            }
                        } else if(mapping.sheetName == 'Recettes') {
                            for(let row of sheet.affectedRows) {
                                let mappedRow:any = {};

                                for(let map of mapping.mapping) {
                                    mappedRow[map.to] = this._transformData(map, row[map.from]);
                                }

                                mappedRow.recurrent = true;

                                this.newIncomes.push(new Income(mappedRow));
                            }
                        }
                    }
                }
            }


            this._dataService.saveMass('outcomes', this.newOutcomes).subscribe(res => {
                // console.log(res)
            });
            this._dataService.saveMass('incomes', this.newIncomes).subscribe(res => {
                // console.log(res)
            });

            this._cd.markForCheck();
        })
    }

    private _transformData(mapping:XlsxSheetDataMappingAssoc, data:any):any {
        if(mapping.type == 'raw') {
            return data;
        } else if(mapping.type == 'boolean') {
            return data == 'X';
        } else if(mapping.type == 'date') {
            return TimeService.yyyyMmDd(data);
        } else {
            console.group(mapping.type)
        }
    }
}
