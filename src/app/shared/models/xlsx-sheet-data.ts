export class XlsxSheetData {
    public sheetName:string;
    public headers:string[] = [];
    public affectedRows:any[] = [];

    constructor(sheetName:string, rawDatas:any[]) {
        this.sheetName = sheetName;

        this.headers = rawDatas.splice(0, 1)[0];

        for(let row of rawDatas) {
            if(row.length > 0) {
                let newRow:any = {};

                for(let i in this.headers) {
                    newRow[this.headers[i]] = row[i];
                }

                this.affectedRows.push(newRow);
            }
        }
    }
}

export class XlsxSheetDataMapping {
    public sheetName:string;
    public mapping:XlsxSheetDataMappingAssoc[] = [];
    public newClass:any;

    constructor(init?:Partial<XlsxSheetDataMapping>) {
        Object.assign(this, init);

        this.mapping = [];
        for(let map of init.mapping) {
            this.mapping.push(new XlsxSheetDataMappingAssoc(map));
        }
    }
}

export class XlsxSheetDataMappingAssoc {
    public from:string;
    public to:string;
    public type:string = 'raw';

    constructor(init?:Partial<XlsxSheetDataMappingAssoc>) {
        Object.assign(this, init);
    }
}
