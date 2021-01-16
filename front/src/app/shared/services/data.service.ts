import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import * as moment from 'moment';
import 'moment/locale/fr';
import {BehaviorSubject, Observable, of} from 'rxjs';
import {flatMap} from 'rxjs/operators';
import {NavEntry} from '../../ui/models/nav-entry';
import {Toast} from '../../ui/models/toast';
import {ToastService} from '../../ui/services/toast.service';
import {Account} from '../enum/account.enum';
import {BackResponse} from '../models/back-response';
import {Income} from '../models/income';
import {Outcome} from '../models/outcome';
import {Recipient} from '../models/recipient';
import {Summary} from '../models/summary';
import {Shop} from '../models/shop';
import {FoodTicket, FoodTicketStats} from '../models/food-ticket';

@Injectable({
    providedIn: 'root'
})
export class DataService {
    public static titles:any = {income: 'Recette', outcome: 'Dépense', recipient: 'Bénéficiaire', foodTicket: 'Tickets resto'};
    private _host:string = '192.168.56.102';
    private _port:number = 3000;
    private _baseUrl:string = '/';

    private readonly _deltaMonth:number = 6;
    public summary$:BehaviorSubject<Summary[]>;

    public menuEntries$:BehaviorSubject<NavEntry[]>;

    public dateStart:moment.Moment;
    public dateEnd:moment.Moment;

    constructor(
        private _http:HttpClient,
        protected _toastService:ToastService,
        private _routerService:Router,
    ) {
        let months:Summary[] = [];
        for(let i:number = - this._deltaMonth; i <= this._deltaMonth; i++) {
            let curDate:moment.Moment = moment();
            curDate.month(curDate.month() + i);
            curDate.date(1);

            curDate.hour(0);
            curDate.minute(0);
            curDate.second(0);

            months.push(new Summary({date:new Date(curDate.toString())}));
            if(i == -this._deltaMonth) {
                this.dateStart = curDate;
            } else if(i == this._deltaMonth) {
                curDate.month(curDate.month() + 1);
                curDate.second(curDate.second() - 1);


                this.dateEnd = curDate;
            }
        }

        this.summary$ = new BehaviorSubject(months);

        let navEntryList:NavEntry[] = [];

        this._routerService.config.forEach(route => {
            navEntryList.push(new NavEntry({label:route.data.title, icon:route.data.icon, path:route.path}));
        });

        this.menuEntries$ = new BehaviorSubject(navEntryList);
    }

    public getIncomes():Observable<Income[]> {
        let data:any = {start:this.dateStart, end: this.dateEnd};
        let toastId:number = this._toastService.addToast(DataService.titles.income, 'Recettes en cours de chargement', Toast.LOADING);

        return this._http.get<Income[]>(this._constructUrl('incomes'), this._getHttpHeader('GET', data)).pipe(
            flatMap((ev) => {
                let list:Income[] = [];

                for(let i = 0; i < ev['length']; i++) {
                    list.push(new Income(ev[i]));
                }

                this._toastService.closeToast(toastId);
                this._toastService.addToast(DataService.titles.outcome, 'Recettes récupérées', Toast.SUCCESS);

                return of(list);
            })
        );
    }

    public getIncome(id:string):Observable<Income> {
        let data:any = {id: id};
        let toastId:number = this._toastService.addToast(DataService.titles.income, 'Recette en cours de chargement', Toast.LOADING);

        return this._http.get<Income>(this._constructUrl('income?id='+id), this._getHttpHeader('GET', data)).pipe(
            flatMap((ev) => {
                let inc:Income;

                if(ev[0] != undefined) {
                    inc = new Income(ev[0]);
                }

                this._toastService.closeToast(toastId);
                this._toastService.addToast(DataService.titles.income, 'Recette récupérée', Toast.SUCCESS);

                return of(inc);
            })
        );
    }

    public getOutcomes():Observable<Outcome[]> {
        let data:any = {start:this.dateStart, end: this.dateEnd};
        let toastId:number = this._toastService.addToast(DataService.titles.outcome, 'Dépenses en cours de chargement', Toast.LOADING);

        return this._http.get<Outcome[]>(this._constructUrl('outcomes'), this._getHttpHeader('GET', data)).pipe(
            flatMap((ev) => {
                let list:Outcome[] = [];

                for(let i = 0; i < ev['length']; i++) {
                    list.push(new Outcome(ev[i]));
                }

                this._toastService.closeToast(toastId);
                this._toastService.addToast(DataService.titles.outcome, 'Dépenses récupérées', Toast.SUCCESS);

                return of(list);
            })
        );
    }

    public getOutcome(id:string):Observable<Outcome> {
        let data:any = {id: id};
        let toastId:number = this._toastService.addToast(DataService.titles.outcome, 'Dépense en cours de chargement', Toast.LOADING);

        return this._http.get<Outcome>(this._constructUrl('outcome?id='+id), this._getHttpHeader('GET', data)).pipe(
            flatMap((ev) => {
                let inc:Outcome;

                if(ev[0] != undefined) {
                    inc = new Outcome(ev[0]);
                }

                this._toastService.closeToast(toastId);
                this._toastService.addToast(DataService.titles.outcome, 'Dépense récupérée', Toast.SUCCESS);

                return of(inc);
            })
        );
    }

    public saveIncome(inc:Income):Observable<BackResponse> {
        let toastId:number = this._toastService.addToast(DataService.titles.income, 'Enregistrement de la recette en cours', Toast.LOADING);

        let data:any = {inc: inc.toObject()};

        return this._http.put<any>(this._constructUrl('income'), this._getHttpHeader('PUT', data)).pipe(
            flatMap((ev) => {
                let result:BackResponse = new BackResponse(ev);

                this._toastService.closeToast(toastId);
                this._handleResponse(result, DataService.titles.income, 'Recette enregistrée');

                return of(result);
            })
        );
    }

    public saveOutcome(out:Outcome):Observable<any> {
        let toastId:number = this._toastService.addToast(DataService.titles.outcome, 'Enregistrement de la dépense en cours', Toast.LOADING);

        let data:any = {out: out.toObject()};

        return this._http.put<any>(this._constructUrl('outcome'), this._getHttpHeader('PUT', data)).pipe(
            flatMap((ev) => {
                let result:BackResponse = new BackResponse(ev);

                this._toastService.closeToast(toastId);
                this._handleResponse(result, DataService.titles.income, 'Dépense enregistrée');

                return of(result);
            })
        );
    }

    public saveMass(path:string, datas:any[]):Observable<any> {
        let toastId:number = this._toastService.addToast(DataService.titles.income, 'Enregistrement de masse en cours', Toast.LOADING);

        let sendableDatas:Array<Income|Outcome> = [];

        datas.forEach(item => {
            sendableDatas.push(item.toObject());
        })

        let data:any = {datas: sendableDatas};

        return this._http.put<any>(this._constructUrl(path), this._getHttpHeader('PUT', data)).pipe(
            flatMap((ev) => {
                let result:BackResponse = new BackResponse(ev);

                this._toastService.closeToast(toastId);
                this._handleResponse(result, DataService.titles.income, 'Recette enregistrée');

                return of(result);
            },
            (err) => {console.error(err)})
        );
    }

    public getAccounts():BehaviorSubject<string[]> {
        let accounts:string[] = [];

        accounts.push(Account.MINE);
        accounts.push(Account.COMMON);

        return new BehaviorSubject<string[]>(accounts);
    }

    public getRecipients():Observable<Recipient[]> {
        let data:any = {};
        let toastId:number = this._toastService.addToast(DataService.titles.recipient, 'Bénéficiaires en cours de chargement', Toast.LOADING);

        return this._http.get<Recipient[]>(this._constructUrl('recipients'), this._getHttpHeader('GET', data)).pipe(
            flatMap((ev) => {
                let list:Recipient[] = [];

                for(let i = 0; i < ev['length']; i++) {
                    ev[i].main = ev[i].main === 1;

                    list.push(new Recipient(ev[i]));
                }

                this._toastService.closeToast(toastId);

                return of(list);
            })
        );
    }

    public saveRecipient(rec:Recipient):Observable<any> {
        let toastId:number = this._toastService.addToast(DataService.titles.recipient, 'Enregistrement du bénéficiaire en cours', Toast.LOADING);

        let data:any = {rec: rec.toObject()};

        return this._http.put<any>(this._constructUrl('recipient'), this._getHttpHeader('PUT', data)).pipe(
            flatMap((ev) => {
                let result:BackResponse = new BackResponse(ev);

                this._toastService.closeToast(toastId);
                this._handleResponse(result, DataService.titles.income, 'Bénéficiaire enregistré');

                return of(result);
            })
        );
    }

    public getShops():Observable<Shop[]> {
        let data:any = {};
        let toastId:number = this._toastService.addToast(DataService.titles.recipient, 'Magasins en cours de chargement', Toast.LOADING);

        return this._http.get<Shop[]>(this._constructUrl('shops'), this._getHttpHeader('GET', data)).pipe(
            flatMap((ev) => {
                let list:Shop[] = [];

                for(let i = 0; i < ev['length']; i++) {
                    ev[i].main = ev[i].main === 1;

                    list.push(new Shop(ev[i]));
                }

                this._toastService.closeToast(toastId);

                return of(list);
            })
        );
    }



    public getFoodTickets():Observable<FoodTicket[]> {
        let data:any = {};
        let toastId:number = this._toastService.addToast(DataService.titles.foodTicket, 'Tickets restos en cours de chargement', Toast.LOADING);

        return this._http.get<FoodTicket[]>(this._constructUrl('food-tickets'), this._getHttpHeader('GET', data)).pipe(
            flatMap((ev) => {
                let list:FoodTicket[] = [];

                for(let i = 0; i < ev['length']; i++) {
                    ev[i].main = ev[i].main === 1;

                    list.push(new FoodTicket(ev[i]));
                }

                this._toastService.closeToast(toastId);

                return of(list);
            })
        );
    }

    public getFoodTicketStats():Observable<FoodTicketStats[]> {
        let data:any = {};
        let toastId:number = this._toastService.addToast(DataService.titles.foodTicket, 'Statistiques des tickets restos en cours de chargement', Toast.LOADING);

        return this._http.get<FoodTicketStats[]>(this._constructUrl('food-tickets/stats'), this._getHttpHeader('GET', data)).pipe(
            flatMap((ev) => {
                let list:FoodTicketStats[] = [];

                for(let i = 0; i < ev['length']; i++) {
                    ev[i].main = ev[i].main === 1;

                    list.push(new FoodTicketStats(ev[i]));
                }

                this._toastService.closeToast(toastId);

                return of(list);
            })
        );
    }

    public getFoodTicket(id:string):Observable<FoodTicket> {
        let data:any = {id: id};
        let toastId:number = this._toastService.addToast(DataService.titles.foodTicket, 'Ticket resto en cours de chargement', Toast.LOADING);

        return this._http.get<FoodTicket>(this._constructUrl('food-ticket?id='+id), this._getHttpHeader('GET', data)).pipe(
            flatMap((ev) => {
                let ft:FoodTicket;

                if(ev[0] != undefined) {
                    ft = new FoodTicket(ev[0]);
                }

                this._toastService.closeToast(toastId);
                this._toastService.addToast(DataService.titles.foodTicket, 'Ticket resto récupéré', Toast.SUCCESS);

                return of(ft);
            })
        );
    }

    public saveFoodTicket(ft:FoodTicket):Observable<any> {
        let toastId:number = this._toastService.addToast(DataService.titles.foodTicket, 'Enregistrement du ticket resto en cours', Toast.LOADING);

        let data:any = {ft: ft.toObject()};

        return this._http.put<any>(this._constructUrl('food-ticket'), this._getHttpHeader('PUT', data)).pipe(
            flatMap((ev) => {
                let result:BackResponse = new BackResponse(ev);

                this._toastService.closeToast(toastId);
                this._handleResponse(result, DataService.titles.foodTicket, 'Ticket resto enregistré');

                return of(result);
            })
        );
    }

    private _calcSummary() {
        // let sums:Summary[] = this.summary$.value;

        // for(let curSum of sums) {
        //     let key:string = curSum.monthKey;

        //     let incs:Income[] = [];
        //     let outs:Outcome[] = [];

        //     for(let inc of this.income$.value) {
        //         if(inc.monthKey == key) {
        //             incs.push(inc);
        //         }
        //     }

        //     for(let out of this.outcome$.value) {
        //         if(out.monthKey == key) {
        //             outs.push(out);
        //         }
        //     }

        //     curSum.setIncome(incs);
        //     curSum.setOutcome(outs);
        // }

        // this.summary$.next(sums);
    }

    private _getHttpHeader(method:string, data:any, responseType:string = 'json'):any {
        let headers:HttpHeaders[] = [];

        headers.push(new HttpHeaders({ 'Content-Type': 'application/json', 'Accept': 'application/json, text/plain, */*' }));

        // let's go
        let requestOptions = {
            method: method,
            headers: headers,
            body: data,
            // search: this._params,
            responseType: responseType
        };

        return requestOptions;
    }

    private handleError<T>(operation = 'operation', result?: T) {
        return (error: any): Observable<T> => {

          // TODO: send the error to remote logging infrastructure
          console.error(error); // log to console instead

          // TODO: better job of transforming error for user consumption
          console.log(`${operation} failed: ${error.message}`);

          // Let the app keep running by returning an empty result.
          return of(result as T);
        };
    }

    private _constructUrl(path:string):string {
          return 'http://'+this._host+':'+this._port+this._baseUrl+path;
    }

    private _handleResponse(result:BackResponse, title:string, message:string) {
        if(result.affectedRows > 0) {
            this._toastService.addToast(title, message, Toast.SUCCESS);
        } else {
            this._toastService.addToast(title, result.message, Toast.ERROR, false);
        }
    }

    private _notifyError(title:string, message:string) {
        this._toastService.addToast(title, message, Toast.ERROR, false);
    }
}
