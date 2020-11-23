import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable,Subscriber} from 'rxjs';
import {flatMap, map} from 'rxjs/operators';
import * as xlsx from 'xlsx';
import {XlsxSheetData} from '../../shared/models/xlsx-sheet-data';

@Injectable({
  providedIn: 'root'
})
export class ImportDataService {

    constructor(
        protected _http:HttpClient,
    ) {

    }

    public loadXlsxFile(filename:string):Observable<XlsxSheetData[]> {
        return this._http.get(filename, {responseType: 'blob'}).pipe(
            flatMap((dataLoaded: Blob) => {
                let reader: FileReader = new FileReader();

                return Observable.create((observer: Subscriber<XlsxSheetData[]>): void => {
                    // if success
                    reader.onload = ((ev: any): void => {
                        let bstr: string = ev.target.result;
                        let data:XlsxSheetData[] = this._importFromFile(bstr);

                        observer.next(data);
                        observer.complete();
                    });

                    // if failed
                    reader.onerror = (error: any): void => {
                      observer.error(error);
                    }

                    reader.readAsBinaryString(dataLoaded);
                  });
            }),
            map((dataParsed:XlsxSheetData[]) => {
                return dataParsed;
            }),
        );
    }

    protected _importFromFile(bstr: string): XlsxSheetData[] {
        /* read workbook */
        let wb: xlsx.WorkBook = xlsx.read(bstr, { type: 'binary', cellDates:true });
        let datas:XlsxSheetData[] = [];

        for(let sheetName of wb.SheetNames) {
            datas.push(this._readWorkSheet(wb, sheetName));
        }

        return datas;
    }

    protected _readWorkSheet(wb:xlsx.WorkBook, sheetName:string): XlsxSheetData {
        let ws: xlsx.WorkSheet = wb.Sheets[sheetName];

        let data:any[] = (xlsx.utils.sheet_to_json(ws, { header: 1, blankrows: false }));

        return new XlsxSheetData(sheetName, data);
    }
}
