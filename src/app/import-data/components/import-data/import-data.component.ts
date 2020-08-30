import { Component, OnInit } from '@angular/core';
import * as xlsx from 'xlsx';

@Component({
    selector: 'app-import-data',
    templateUrl: './import-data.component.html',
    styleUrls: ['./import-data.component.scss']
})
export class ImportDataComponent implements OnInit {
//https://medium.com/code-divoire/import-data-et-matching-de-fichier-excel-avec-xlsx-7e941f52f9be
    file: any;

    constructor() {}

    public ngOnInit() {

    }

    // public getFile(event: any) {
    //   this.file = event.target.files[0];

    //   const classe = {
    //     libelle: null,
    //     ecole: null,
    //     date_creation: null,
    //     nbre_etudiant: null
    //   };

    //   this.fileReader(this.file, classe);
    // }

    // private fileReader(file: any, line: any) {
    //     let fileReader = new FileReader();

    //     fileReader.onload = (e) => {
    //       this.arrayBuffer = fileReader.result;
    //       const data = new Uint8Array(this.arrayBuffer);
    //       const arr = new Array();

    //       for (let i = 0; i !== data.length; i++) {
    //         arr[i] = String.fromCharCode(data[i]);
    //       }

    //       const bstr = arr.join('');
    //       const workbook = XLSX.read(bstr, { type: 'binary', cellDates: true });
    //       const first_sheet_name = workbook.SheetNames[0];

    //       const worksheet = workbook.Sheets[first_sheet_name];
    //       this.worksheet = XLSX.utils.sheet_to_json(worksheet, { raw: true });

    //       /**
    //        * Call matching function
    //        */
    //       this.matchingCell(this.worksheet, line);
    //     };
    //     fileReader.readAsArrayBuffer(file);
    //   }

    //   private matchingCell(worksheet: any, monTab: any, line?: any) {
    //     monTab.value = [];

    //     for (let i = 0; i < worksheet.length; i++) {
    //       const worksheetLine = worksheet[i];
    //       const updatedLine = {
    //         libelle: worksheet['LIBELLE'],
    //         ecole: worksheet['ECOLE'],
    //         date_creation: worksheet['CREATION'],
    //         nbre_etudiant: worksheet['NBRE_ETUDIANT']
    //       };
    //       line = {..line, ...updatedLine};
    //       monTab.value.push(line);
    //     }
    //   }
    // }
}
