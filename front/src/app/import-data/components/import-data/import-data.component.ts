import {ChangeDetectorRef,Component} from '@angular/core';
import {AbstractComponent} from 'src/app/shared/models/abstract-component';
import {XlsxSheetDataMapping, XlsxSheetDataMappingAssoc} from 'src/app/shared/models/xlsx-sheet-data';
import {DataService} from 'src/app/shared/services/data.service';
import {ToastService} from 'src/app/ui/services/toast.service';
import {ImportDataService} from '../../services/import-data.service';
import {Outcome} from 'src/app/shared/models/outcome';

@Component({
    selector: 'app-import-data',
    templateUrl: './import-data.component.html',
    styleUrls: ['./import-data.component.scss']
})
export class ImportDataComponent extends AbstractComponent {
    public dataMapping:XlsxSheetDataMapping[] = [];
    public newOutcomes:Outcome[] = [];

    constructor(
        protected _cd:ChangeDetectorRef,
        protected _toastService:ToastService,
        protected _importDataService:ImportDataService,
        protected _dataService:DataService,
    ) {
        super(_cd, _toastService);

        this.dataMapping.push(new XlsxSheetDataMapping({sheetName:"Dépenses",  mapping:[
            new XlsxSheetDataMappingAssoc({from:'Date', to:'date', type:'date'}),
            new XlsxSheetDataMappingAssoc({from:'Compte', to:'account'}),
            new XlsxSheetDataMappingAssoc({from:'Bénéficiaire', to:'recipient'}),
            new XlsxSheetDataMappingAssoc({from:'Objet', to:'label'}),
            new XlsxSheetDataMappingAssoc({from:'Montant', to:'amount'}),
            new XlsxSheetDataMappingAssoc({from:'Encours', to:'end_of_month', type:'boolean'}),
            new XlsxSheetDataMappingAssoc({from:'Partagé', to:'shared', type:'boolean'}),
            new XlsxSheetDataMappingAssoc({from:'Remboursé', to:'refund', type:'boolean'}),
            new XlsxSheetDataMappingAssoc({from:'Passé sur le compte', to:'on_account', type:'boolean'}),
            new XlsxSheetDataMappingAssoc({from:'Evol/Remarque', to:'comment'}),
        ]}));

        this.dataMapping.push(new XlsxSheetDataMapping({sheetName:"Prélèv",  mapping:[
            new XlsxSheetDataMappingAssoc({from:'A partir du', to:'start_on', type:'date'}),
            new XlsxSheetDataMappingAssoc({from:'Jusqu\'au', to:'end_on', type:'date'}),
            // new XlsxSheetDataMappingAssoc({from:'Compte', to:'account'}),
            // new XlsxSheetDataMappingAssoc({from:'Bénéficiaire', to:'recipient'}),
            new XlsxSheetDataMappingAssoc({from:'Nom', to:'label'}),
            new XlsxSheetDataMappingAssoc({from:'Montant', to:'amount'}),
            // new XlsxSheetDataMappingAssoc({from:'Encours', to:'end_of_month', type:'boolean'}),
            // new XlsxSheetDataMappingAssoc({from:'Partagé', to:'shared', type:'boolean'}),
            // new XlsxSheetDataMappingAssoc({from:'Remboursé', to:'refund', type:'boolean'}),
            // new XlsxSheetDataMappingAssoc({from:'Passé sur le compte', to:'on_account', type:'boolean'}),
            new XlsxSheetDataMappingAssoc({from:'Evol/Remarque', to:'comment'}),
            new XlsxSheetDataMappingAssoc({from:'Jour', to:'day'}),
        ]}));
    }

    public ngOnInit() {
        this.addSub = this._importDataService.loadXlsxFile('assets/Budget.xlsx').subscribe(worksheet => {
            for(let mapping of this.dataMapping) {
                console.log(mapping)
                for(let sheet of worksheet) {
                    if(sheet.sheetName == mapping.sheetName) {
                        if(mapping.sheetName == 'Dépenses') {


                            for(let row of sheet.affectedRows) {
                                let mappedRow:any = {};

                                for(let map of mapping.mapping) {
                                    mappedRow[map.to] = row[map.from];
                                }

                                this.newOutcomes.push(new Outcome(mappedRow));
                            }
                        } else if(sheet.sheetName == mapping.sheetName) {
                            if(mapping.sheetName == 'Prélèv') {
                                let outcomes:Outcome[] = [];

                                for(let row of sheet.affectedRows) {
                                    let mappedRow:any = {};

                                    for(let map of mapping.mapping) {
                                        mappedRow[map.to] = row[map.from];
                                    }

                                    mappedRow.recurrent = true;

                                    this.newOutcomes.push(new Outcome(mappedRow));
                                }
                            }
                        }
                    }
                }
            }

            this._dataService.saveMass('outcome', this.newOutcomes);
            // console.log('subscribe')
            // console.log(datas)

            this._cd.markForCheck();
        })
    }


}
