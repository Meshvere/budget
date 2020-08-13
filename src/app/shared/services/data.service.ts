import {Injectable} from '@angular/core';
import {BehaviorSubject, ReplaySubject} from 'rxjs';
import {NavEntry} from 'src/app/ui/models/nav-entry';
import {Recette} from '../models/recette';

@Injectable({
  providedIn: 'root'
})
export class DataService {
    private _deltaMonth:number = 6;
    public monthList$:BehaviorSubject<number[]>;

    public menuEntries$:BehaviorSubject<NavEntry[]>

    constructor() {
        let months:number[] = [];
        for(let i:number = - this._deltaMonth; i <= this._deltaMonth; i++) {
            months.push(i);
        }

        this.monthList$ = new BehaviorSubject(months);

        let navEntryList:NavEntry[] = [];

        navEntryList.push(new NavEntry({label:'Bilan', path:'summary'}));
        navEntryList.push(new NavEntry({label:'Recette', path:'recette'}));
        navEntryList.push(new NavEntry({label:'Dépenses', path:'depense'}));
        navEntryList.push(new NavEntry({label:'Remboursements', path:'remboursements'}));
        navEntryList.push(new NavEntry({label:'Tickets resto', path:'ticket-resto'}));
        navEntryList.push(new NavEntry({label:'Epargne', path:'epargne'}));

        this.menuEntries$ = new BehaviorSubject(navEntryList);
    }

    public getRecette():ReplaySubject<Recette[]> {
        let recette:Recette[] = [];
        recette.push(new Recette({date:new Date(), montant: Math.random() * 2500}))
        recette.push(new Recette({date:new Date(), montant: Math.random() * 2500, partage:true}))

        let subj:ReplaySubject<Recette[]> = new ReplaySubject();
        subj.next(recette)

        return subj;
    }
}
