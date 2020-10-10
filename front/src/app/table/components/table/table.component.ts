import { Component, OnInit, ChangeDetectorRef, Input } from '@angular/core';
import {AbstractComponent} from 'src/app/shared/models/abstract-component';
import {ToastService} from 'src/app/ui/services/toast.service';
import {TableColumn} from '../../models/table-column';
import {IconService} from 'src/app/ui/services/icon.service';
import {TableAction, TableActionRouteTo} from '../../models/table-action';
import {ActivatedRoute,Router} from '@angular/router';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent extends AbstractComponent {
    @Input() public title:string;
    @Input() public columns:TableColumn[] = [];
    @Input() public actions:TableAction[] = [];
    @Input() public rows:any[] = [];

    constructor(
        protected _cd:ChangeDetectorRef,
        protected _toastService:ToastService,
        public icon:IconService,
        protected _route:ActivatedRoute,
        protected _router:Router,
    ) {
        super(_cd, _toastService);
    }

    ngOnInit(): void {
    }

    public doAction(row:any, action:TableActionRouteTo) {
        if(action.constructor.name == 'TableActionRouteTo') {
            this._router.navigate(action.getRoute(row));
        }
    }
}
