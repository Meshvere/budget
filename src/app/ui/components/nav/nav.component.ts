import { Component, OnInit, OnDestroy } from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import {NavEntry} from '../../models/nav-entry';

@Component({
    selector: 'app-nav',
    templateUrl: './nav.component.html',
    styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit, OnDestroy {
    public entryList:NavEntry[] = [];

    constructor(
      private _route: ActivatedRoute,
      private _router: Router,
      ) {
        this.entryList.push(new NavEntry({label:'Bilan', path:'bilan'}));
        this.entryList.push(new NavEntry({label:'Recette', path:'recette'}));
        this.entryList.push(new NavEntry({label:'Dépenses', path:'depense'}));
        this.entryList.push(new NavEntry({label:'Remboursements', path:'remboursements'}));
        this.entryList.push(new NavEntry({label:'Tickets resto', path:'ticket-resto'}));
    }

    ngOnInit(): void {
    }

    ngOnDestroy(): void {
    }

}
