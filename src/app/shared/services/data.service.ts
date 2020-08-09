import { Injectable } from '@angular/core';
import {BehaviorSubject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private _deltaMonth:number = 6;
  public monthList$:BehaviorSubject<number[]>;

  constructor() {
    let months:number[] = [];
    for(let i:number = - this._deltaMonth; i <= this._deltaMonth; i++) {
      months.push(i);
    }

    this.monthList$ = new BehaviorSubject(months);
  }
}
