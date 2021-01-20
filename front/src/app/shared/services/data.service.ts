import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import * as moment from 'moment';
import 'moment/locale/fr';
import {BehaviorSubject, Observable, of} from 'rxjs';
import {flatMap} from 'rxjs/operators';
import {Toast} from '../../toast/models/toast';
import {ToastService} from '../../toast/services/toast.service';
import {NavEntry} from '../../shared/models/nav-entry';
import {Account} from '../enum/account.enum';
import {BackResponse} from '../models/back-response';
import {FoodTicket} from '../models/food-ticket';
import {Income} from '../models/income';
import {Outcome} from '../models/outcome';
import {Recipient} from '../models/recipient';
import {Shop} from '../models/shop';
import {Summary} from '../models/summary';
import {ConfigService} from './config.service';

@Injectable({
    providedIn: 'root'
})
export class DataService {
    public static titles:any = {income: 'Recette', outcome: 'Dépense', recipient: 'Bénéficiaire', foodTicket: 'Tickets resto'};

    public summary$:BehaviorSubject<Summary[]>;

    public menuEntries$:BehaviorSubject<NavEntry[]>;

    public dateStart:moment.Moment;
    public dateEnd:moment.Moment;

    constructor(
        private _http:HttpClient,
        private _routerService:Router,
    ) {
        let months:Summary[] = [];
        for(let i:number = - ConfigService.deltaMonth; i <= ConfigService.deltaMonth; i++) {
            let curDate:moment.Moment = moment();
            curDate.month(curDate.month() + i);
            curDate.date(1);

            curDate.hour(0);
            curDate.minute(0);
            curDate.second(0);

            months.push(new Summary({date:new Date(curDate.toString())}));
            if(i == -ConfigService.deltaMonth) {
                this.dateStart = curDate;
            } else if(i == ConfigService.deltaMonth) {
                curDate.month(curDate.month() + 1);
                curDate.second(curDate.second() - 1);


                this.dateEnd = curDate;
            }
        }

        this.summary$ = new BehaviorSubject(months);

        let navEntryList:NavEntry[] = [];

        this._routerService.config.forEach(route => {
            if(route.data) {
                navEntryList.push(new NavEntry({label:route.data.title, icon:route.data.icon, path:route.path}));
            } else {
                navEntryList.push(new NavEntry({label:'NR '+route.path, path:route.path}));
            }
        });

        this.menuEntries$ = new BehaviorSubject(navEntryList);
    }

    public getIncomes():Observable<Income[]> {
        let data:any = {start:this.dateStart, end: this.dateEnd};
        let toastId:number = ToastService.addToast(DataService.titles.income, 'Recettes en cours de chargement', Toast.LOADING);

        return this._http.get<Income[]>(DataService.constructUrl('incomes'), DataService.getHttpHeader('GET', data)).pipe(
            flatMap((ev) => {
                let list:Income[] = [];

                for(let i = 0; i < ev['length']; i++) {
                    list.push(new Income(ev[i]));
                }

                ToastService.closeToast(toastId);
                ToastService.addToast(DataService.titles.outcome, 'Recettes récupérées', Toast.SUCCESS);

                return of(list);
            })
        );
    }

    public getIncome(id:string):Observable<Income> {
        let data:any = {id: id};
        let toastId:number = ToastService.addToast(DataService.titles.income, 'Recette en cours de chargement', Toast.LOADING);

        return this._http.get<Income>(DataService.constructUrl('income?id='+id), DataService.getHttpHeader('GET', data)).pipe(
            flatMap((ev) => {
                let inc:Income;

                if(ev[0] != undefined) {
                    inc = new Income(ev[0]);
                }

                ToastService.closeToast(toastId);
                ToastService.addToast(DataService.titles.income, 'Recette récupérée', Toast.SUCCESS);

                return of(inc);
            })
        );
    }

    public getOutcomes():Observable<Outcome[]> {
        let data:any = {start:this.dateStart, end: this.dateEnd};
        let toastId:number = ToastService.addToast(DataService.titles.outcome, 'Dépenses en cours de chargement', Toast.LOADING);

        return this._http.get<Outcome[]>(DataService.constructUrl('outcomes'), DataService.getHttpHeader('GET', data)).pipe(
            flatMap((ev) => {
                let list:Outcome[] = [];

                for(let i = 0; i < ev['length']; i++) {
                    list.push(new Outcome(ev[i]));
                }

                ToastService.closeToast(toastId);
                ToastService.addToast(DataService.titles.outcome, 'Dépenses récupérées', Toast.SUCCESS);

                return of(list);
            })
        );
    }

    public getOutcome(id:string):Observable<Outcome> {
        let data:any = {id: id};
        let toastId:number = ToastService.addToast(DataService.titles.outcome, 'Dépense en cours de chargement', Toast.LOADING);

        return this._http.get<Outcome>(DataService.constructUrl('outcome?id='+id), DataService.getHttpHeader('GET', data)).pipe(
            flatMap((ev) => {
                let inc:Outcome;

                if(ev[0] != undefined) {
                    inc = new Outcome(ev[0]);
                }

                ToastService.closeToast(toastId);
                ToastService.addToast(DataService.titles.outcome, 'Dépense récupérée', Toast.SUCCESS);

                return of(inc);
            })
        );
    }

    public saveIncome(inc:Income):Observable<BackResponse> {
        let toastId:number = ToastService.addToast(DataService.titles.income, 'Enregistrement de la recette en cours', Toast.LOADING);

        let data:any = {inc: inc.toObject()};

        return this._http.put<any>(DataService.constructUrl('income'), DataService.getHttpHeader('PUT', data)).pipe(
            flatMap((ev) => {
                let result:BackResponse = new BackResponse(ev);

                ToastService.closeToast(toastId);
                DataService.handleResponse(result, DataService.titles.income, 'Recette enregistrée');

                return of(result);
            })
        );
    }

    public saveOutcome(out:Outcome):Observable<any> {
        let toastId:number = ToastService.addToast(DataService.titles.outcome, 'Enregistrement de la dépense en cours', Toast.LOADING);

        let data:any = {out: out.toObject()};

        return this._http.put<any>(DataService.constructUrl('outcome'), DataService.getHttpHeader('PUT', data)).pipe(
            flatMap((ev) => {
                let result:BackResponse = new BackResponse(ev);

                ToastService.closeToast(toastId);
                DataService.handleResponse(result, DataService.titles.income, 'Dépense enregistrée');

                return of(result);
            })
        );
    }

    public saveMass(path:string, datas:any[]):Observable<any> {
        let toastId:number = ToastService.addToast(DataService.titles.income, 'Enregistrement de masse en cours', Toast.LOADING);

        let sendableDatas:Array<Income|Outcome> = [];

        datas.forEach(item => {
            sendableDatas.push(item.toObject());
        })

        let data:any = {datas: sendableDatas};

        return this._http.put<any>(DataService.constructUrl(path), DataService.getHttpHeader('PUT', data)).pipe(
            flatMap((ev) => {
                let result:BackResponse = new BackResponse(ev);

                ToastService.closeToast(toastId);
                DataService.handleResponse(result, DataService.titles.income, 'Recette enregistrée');

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
        let toastId:number = ToastService.addToast(DataService.titles.recipient, 'Bénéficiaires en cours de chargement', Toast.LOADING);

        return this._http.get<Recipient[]>(DataService.constructUrl('recipients'), DataService.getHttpHeader('GET', data)).pipe(
            flatMap((ev) => {
                let list:Recipient[] = [];

                for(let i = 0; i < ev['length']; i++) {
                    ev[i].main = ev[i].main === 1;

                    list.push(new Recipient(ev[i]));
                }

                ToastService.closeToast(toastId);

                return of(list);
            })
        );
    }

    public saveRecipient(rec:Recipient):Observable<any> {
        let toastId:number = ToastService.addToast(DataService.titles.recipient, 'Enregistrement du bénéficiaire en cours', Toast.LOADING);

        let data:any = {rec: rec.toObject()};

        return this._http.put<any>(DataService.constructUrl('recipient'), DataService.getHttpHeader('PUT', data)).pipe(
            flatMap((ev) => {
                let result:BackResponse = new BackResponse(ev);

                ToastService.closeToast(toastId);
                DataService.handleResponse(result, DataService.titles.income, 'Bénéficiaire enregistré');

                return of(result);
            })
        );
    }

    public getShops():Observable<Shop[]> {
        let data:any = {};
        let toastId:number = ToastService.addToast(DataService.titles.recipient, 'Magasins en cours de chargement', Toast.LOADING);

        return this._http.get<Shop[]>(DataService.constructUrl('shops'), DataService.getHttpHeader('GET', data)).pipe(
            flatMap((ev) => {
                let list:Shop[] = [];

                for(let i = 0; i < ev['length']; i++) {
                    ev[i].main = ev[i].main === 1;

                    list.push(new Shop(ev[i]));
                }

                ToastService.closeToast(toastId);

                return of(list);
            })
        );
    }



    public getFoodTickets():Observable<FoodTicket[]> {
        let data:any = {};
        let toastId:number = ToastService.addToast(DataService.titles.foodTicket, 'Tickets restos en cours de chargement', Toast.LOADING);

        return this._http.get<FoodTicket[]>(DataService.constructUrl('food-ticket'), DataService.getHttpHeader('GET', data)).pipe(
            flatMap((ev) => {
                let list:FoodTicket[] = [];

                for(let i = 0; i < ev['length']; i++) {
                    ev[i].main = ev[i].main === 1;

                    list.push(new FoodTicket(ev[i]));
                }

                ToastService.closeToast(toastId);

                return of(list);
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

    public static getHttpHeader(method:string, data:any, responseType:string = 'json'):any {
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

    public static handleError<T>(operation = 'operation', result?: T) {
        return (error: any): Observable<T> => {

          // TODO: send the error to remote logging infrastructure
          console.error(error); // log to console instead

          // TODO: better job of transforming error for user consumption
          console.log(`${operation} failed: ${error.message}`);

          // Let the app keep running by returning an empty result.
          return of(result as T);
        };
    }

    public static constructUrl(path:string):string {
        let url:string = ConfigService.scheme + '://' + ConfigService.host + ':' + ConfigService.port + ConfigService.baseUrl + path;

        return url;
    }

    public static handleResponse(result:BackResponse, title:string, message:string) {
        if(result.affectedRows > 0) {
            ToastService.addToast(title, message, Toast.SUCCESS);
        } else {
            ToastService.addToast(title, result.message, Toast.ERROR, false);
        }
    }

    public static notifyError(title:string, message:string) {
        ToastService.addToast(title, message, Toast.ERROR, false);
    }
}
