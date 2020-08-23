import {Injectable} from '@angular/core';
import {Subject} from 'rxjs';
import {Toast} from '../models/toast';

@Injectable({
  providedIn: 'root'
})
export class ToastService {
  public toastList$:Subject<Toast[]>;
  public _toastList:Toast[] = [];

  constructor() {
    this.toastList$ = new Subject();
    this.toastList$.subscribe(tl => {
      this._toastList = tl;
    });

    this.toastList$.next([]);
  }

  public addToast(title:string, msg:string, type:string = Toast.NORMAL, autoClose:boolean = false):number {
    let list:Toast[] = this._toastList;

    let newToast:Toast = new Toast({title:title, message: msg, type: type, autoClose: autoClose});
    list.push(newToast);

    this.toastList$.next(list);

    return newToast.id;
  }

  public closeToast(id:number) {
    let list:Toast[] = [];

    for(let toast of this._toastList) {
      if(toast.id != id) {
        list.push(toast)
      }
    }

    this.toastList$.next(list);
  }
}
