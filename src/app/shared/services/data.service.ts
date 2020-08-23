import {Injectable} from '@angular/core';
import {AngularFirestore, DocumentReference, AngularFirestoreCollection} from '@angular/fire/firestore';
import {BehaviorSubject, Observable} from 'rxjs';
import {NavEntry} from 'src/app/ui/models/nav-entry';
import {Account} from '../enum/account.enum';
import {Income} from '../models/income';
import cloneDeep from 'lodash/cloneDeep';
import { from, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {
    private _deltaMonth:number = 6;
    public monthList$:BehaviorSubject<number[]>;

    public menuEntries$:BehaviorSubject<NavEntry[]>;

    public income$:BehaviorSubject<Income[]>;
    public incomeLoaded$:BehaviorSubject<boolean>;

    constructor(
      private _db: AngularFirestore
    ) {
        this.incomeLoaded$ = new BehaviorSubject(false);
        let months:number[] = [];
        for(let i:number = - this._deltaMonth; i <= this._deltaMonth; i++) {
            months.push(i);
        }

        this.monthList$ = new BehaviorSubject(months);

        let navEntryList:NavEntry[] = [];

        navEntryList.push(new NavEntry({label:'Bilan', path:'summary'}));
        navEntryList.push(new NavEntry({label:'Recette', path:'income'}));
        navEntryList.push(new NavEntry({label:'Dépenses', path:'depense'}));
        navEntryList.push(new NavEntry({label:'Remboursements', path:'remboursements'}));
        navEntryList.push(new NavEntry({label:'Tickets resto', path:'ticket-resto'}));
        navEntryList.push(new NavEntry({label:'Epargne', path:'epargne'}));

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

    public saveIncome(inc:Income):Observable<void> {
      return from(this._db.collection<Income>('/income').doc(inc.id).set(inc.toObject()));
    }

    public getAccounts():BehaviorSubject<string[]> {
      let accounts:string[] = [];

      accounts.push(Account.MINE);
      accounts.push(Account.COMMON);

      return new BehaviorSubject(accounts);
    }
}
