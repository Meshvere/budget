import { Injectable } from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {Toast} from '../models/toast';

@Injectable({
  providedIn: 'root'
})
export class ToastService {
  public toastList$:BehaviorSubject<Toast[]>;
  private _toastList:Toast[] = [];

  constructor() {
    this.toastList$ = new BehaviorSubject(this._toastList);

    this.toastList$.subscribe(tl => {
      this._toastList = tl;
    })
  }

  public addToast(title:string, msg:string, type:string = Toast.NORMAL, autoClose:boolean = false) {
    this._toastList.push(new Toast({title:title, message: msg, type: type, autoClose: autoClose}));

    console.log('toast Add : '+title+', '+msg+', '+type)

    this.toastList$.next(this._toastList);
  }
}
