import {Injectable} from '@angular/core';
import {Subject} from 'rxjs';
import {Toast} from '../models/toast';

@Injectable({
   providedIn: 'root'
})
export class ToastService {
    public static toastList$:Subject<Toast[]> = new Subject();
    protected static _toastList:Toast[] = [];

    constructor() {
        ToastService.toastList$.subscribe(tl => {
            ToastService._toastList = tl;
        });

        ToastService.toastList$.next([]);
    }

    public static addToast(title:string, msg:string, type:string = Toast.NORMAL, autoClose:boolean = false):number {
        let list:Toast[] = this._toastList;

        let newToast:Toast = new Toast({title:title, message: msg, type: type, autoClose: autoClose});
        list.push(newToast);

        ToastService.toastList$.next(list);

        return newToast.id;
    }

    public static closeToast(id:number) {
        let list:Toast[] = ToastService._toastList.filter(toast => toast.id != id);

        ToastService.toastList$.next(list);
    }
}
