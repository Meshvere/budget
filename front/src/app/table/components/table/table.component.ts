import {ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnChanges, SimpleChanges} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import cloneDeep from 'lodash/cloneDeep';
import {AbstractComponent} from '../../../shared/models/abstract-component';
import {UtilsService} from '../../../shared/services/utils.service';
import {IconService} from '../../../ui/services/icon.service';
import {ToastService} from '../../../ui/services/toast.service';
import {TableAction, TableActionRouteTo} from '../../models/table-action';
import {TableColumn, TableColumnFilter, TableFilterValue} from '../../models/table-column';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TableComponent extends AbstractComponent  implements OnChanges {
    @Input() public title:string;
    @Input() public columns:TableColumn[] = [];
    @Input() public actions:TableAction[] = [];
    private _rows: any[]=[];
    @Input()
    public get rows(): any[] {
        return this._rows;
    }
    public set rows(value: any[]) {
        this._rows=value;

        this._filterRows();

        this._cd.markForCheck();
    }

    public filteredRows:any = [];

    public filters:TableColumnFilter[] = [];

    constructor(
        protected _cd:ChangeDetectorRef,
        protected _toastService:ToastService,
        public icon:IconService,
        protected _route:ActivatedRoute,
        protected _router:Router,
        protected _utilsService:UtilsService,
    ) {
        super(_cd, _toastService, _utilsService);
    }

    public ngOnInit(): void {
    }

    public ngOnChanges(changes: SimpleChanges): void {
        if(changes.columns) {
            this.filters = [];

            this.columns.forEach(col => {
                if(col.filter) {
                    this.filters.push(new TableColumnFilter(col));
                }
            });
        }
        if(changes.rows) {
            this.filters.forEach(filter => {
                filter.values = [];

                if(filter.cellType == 'boolean') {
                    filter.values.push(new TableFilterValue());
                } else {
                    this.rows.forEach(row => {
                        let val:any = row[filter.field];

                        if(filter.values.map(item => item.value).indexOf(val) < 0) {
                            filter.values.push(new TableFilterValue({value:val, label:val}));
                        }
                    });
                }
            });
        }

        if(changes.columns || changes.rows || changes.filters) {
            this._filterRows();
        }
    }

    public doAction(row:any, action:TableActionRouteTo) {
        if(action.constructor.name == 'TableActionRouteTo') {
            this._router.navigate(action.getRoute(row));
        }
    }

    public toggleFilter($event:boolean, filter:TableColumnFilter) {
        filter.active = $event;

        this._filterRows();

        this._cd.markForCheck();
    }

    public filterValueChange($event) {
        this._filterRows();

        this._cd.markForCheck();
    }

    private _filterRows() {
        let filteredRows:any[] = cloneDeep(this.rows);

        this.filters.forEach(filter => {
            if(filter.active) {
                filteredRows = filteredRows.filter(item => {
                    if(filter.cellType == 'boolean') {
                        return item[filter.field] === filter.filterValue;
                    } else if(filter.cellType == 'month') {
                        // console.log(item[filter.field])
                        return item[filter.field] === filter.filterValue;
                    } else {
                        if(filter.filterValue == undefined || filter.filterValue == '') {
                            return item;
                        } else {
                            return item[filter.field] === filter.filterValue;
                        }
                    }
                });
            }
        });

        this.filteredRows = filteredRows;
    }
}
