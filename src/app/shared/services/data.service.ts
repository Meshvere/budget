import {Injectable} from '@angular/core';
import {AngularFirestore, DocumentReference, AngularFirestoreCollection} from '@angular/fire/firestore';
import {BehaviorSubject, Observable} from 'rxjs';
import {NavEntry} from 'src/app/ui/models/nav-entry';
import {Account} from '../enum/account.enum';
import {Income} from '../models/income';
import cloneDeep from 'lodash/cloneDeep';
import { from, of } from 'rxjs';
import {Outcome} from '../models/outcome';

@Injectable({
     providedIn: 'root'
})
export class DataService {
    private _deltaMonth:number = 6;
    public monthList$:BehaviorSubject<number[]>;

    public menuEntries$:BehaviorSubject<NavEntry[]>;

    public income$:BehaviorSubject<Income[]>;
    public incomeLoaded$:BehaviorSubject<boolean>;

    public outcome$:BehaviorSubject<Outcome[]>;
    public outcomeLoaded$:BehaviorSubject<boolean>;

    constructor(
      private _db: AngularFirestore
    ) {
        this.incomeLoaded$ = new BehaviorSubject(false);
        this.outcomeLoaded$ = new BehaviorSubject(false);
        let months:number[] = [];
        for(let i:number = - this._deltaMonth; i <= this._deltaMonth; i++) {
            months.push(i);
        }

        this.monthList$ = new BehaviorSubject(months);

        let navEntryList:NavEntry[] = [];

        navEntryList.push(new NavEntry({label:'Bilan', path:'summary'}));
        navEntryList.push(new NavEntry({label:'Recette', path:'income'}));
        navEntryList.push(new NavEntry({label:'Dépenses', path:'outcome'}));
        navEntryList.push(new NavEntry({label:'Remboursements', path:'refund'}));
        navEntryList.push(new NavEntry({label:'Tickets resto', path:'food-ticket'}));
        navEntryList.push(new NavEntry({label:'Epargne', path:'saving'}));
        navEntryList.push(new NavEntry({label:'Import', path:'import'}));

        this.menuEntries$ = new BehaviorSubject(navEntryList);


        this.income$ = new BehaviorSubject([]);
        this._db.collection<Income>('/income').valueChanges({ idField: 'id' }).subscribe(income => {
            let res:Income[] = [];

            for(let curIn of income) {
                res.push(new Income(curIn));
            }

            this.income$.next(res);
            this.incomeLoaded$.next(true);
        });

        this.outcome$ = new BehaviorSubject([]);
        this._db.collection<Outcome>('/outcome').valueChanges({ idField: 'id' }).subscribe(outcome => {
            let res:Outcome[] = [];

            for(let curIn of outcome) {
                res.push(new Outcome(curIn));
            }

            this.outcome$.next(res);
            this.outcomeLoaded$.next(true);
        });
    }

    // TODO : make real synchro with DB
    public getIncome(id:string):Observable<Income> {
        let inc:Income;

        for(let curInc of this.income$.value) {
            if(curInc.id == id) {
                inc = cloneDeep(curInc);

                break;
            }
        }

        return of(inc);
    }

    // TODO : make real synchro with DB
    public getOutcome(id:string):Observable<Outcome> {
        let out:Outcome;

        for(let curOutc of this.outcome$.value) {
            if(curOutc.id == id) {
                out = cloneDeep(curOutc);

                break;
            }
        }

        return of(out);
    }

    public saveIncome(inc:Income):Observable<void|DocumentReference> {
        if(inc.id != undefined) {
            return from(this._db.collection<Income>('/income').doc(inc.id).set(inc.toObject()));
        } else {
            return from(this._db.collection<Income>('/income').add(inc.toObject()));
        }

    }

    public saveOutcome(out:Outcome):Observable<void|DocumentReference> {
        if(out.id != undefined) {
            return from(this._db.collection<Income>('/outcome').doc(out.id).set(out.toObject()));
        } else {
            return from(this._db.collection<Income>('/outcome').add(out.toObject()));
        }
    }

    public getAccounts():BehaviorSubject<string[]> {
        let accounts:string[] = [];

        accounts.push(Account.MINE);
        accounts.push(Account.COMMON);

        return new BehaviorSubject(accounts);
    }
}
