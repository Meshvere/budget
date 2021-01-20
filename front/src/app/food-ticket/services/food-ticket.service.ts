import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/internal/Observable';
import {of} from 'rxjs/internal/observable/of';
import {flatMap} from 'rxjs/operators';
import {DataServiceI} from '../../shared/interfaces/data-service-i';
import {BackResponse} from '../../shared/models/back-response';
import {FoodTicket, FoodTicketStats} from '../../shared/models/entities/food-ticket';
import {DataService} from '../../shared/services/data.service';
import {Toast} from '../../toast/models/toast';
import {ToastService} from '../../toast/services/toast.service';

@Injectable({
  providedIn: 'root'
})
export class FoodTicketService implements DataServiceI {
    public toastTitle:string = 'Ticket resto';

    constructor(
        private _http:HttpClient,
    ) {

    }

    public getOneById(id:number): Observable<FoodTicket> {
        let data:any = {id: id};
        let toastId:number = ToastService.addToast(this.toastTitle, 'Recette en cours de chargement', Toast.LOADING);

        return this._http.get<FoodTicket>(DataService.constructUrl('food-ticket/item/'+id), DataService.getHttpHeader('GET', data)).pipe(
            flatMap((ev) => {
                let ft:FoodTicket;

                if(ev[0] != undefined) {
                    ft = new FoodTicket(ev[0]);
                }

                ToastService.closeToast(toastId);
                ToastService.addToast(this.toastTitle, 'Ticket resto récupéré', Toast.SUCCESS);

                return of(ft);
            })
        );
    }

    public getAll(): Observable<FoodTicket[]> {
        let data:any = {};
        let toastId:number = ToastService.addToast(this.toastTitle, 'Tickets restos en cours de chargement', Toast.LOADING);

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

    public save(ft:FoodTicket):Observable<BackResponse> {
        let toastId:number = ToastService.addToast(this.toastTitle, 'Enregistrement du ticket resto en cours', Toast.LOADING);

        let data:any = {ft: ft.toObject()};

        return this._http.put<any>(DataService.constructUrl('food-ticket'), DataService.getHttpHeader('PUT', data)).pipe(
            flatMap((ev) => {
                let result:BackResponse = new BackResponse(ev);

                ToastService.closeToast(toastId);
                DataService.handleResponse(result, this.toastTitle, 'Ticket resto enregistré');

                return of(result);
            })
        );
    }

    public deleteOneById(id:number) {

    }

    public getStats():Observable<FoodTicketStats[]> {
        let data:any = {};
        let toastId:number = ToastService.addToast(this.toastTitle, 'Statistiques des tickets restos en cours de chargement', Toast.LOADING);

        return this._http.get<FoodTicketStats[]>(DataService.constructUrl('food-ticket/stats'), DataService.getHttpHeader('GET', data)).pipe(
            flatMap((ev) => {
                let list:FoodTicketStats[] = [];

                for(let i = 0; i < ev['length']; i++) {
                    ev[i].main = ev[i].main === 1;

                    list.push(new FoodTicketStats(ev[i]));
                }

                ToastService.closeToast(toastId);

                return of(list);
            })
        );
    }
}
