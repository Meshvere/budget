import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {
    public static scheme:string = 'http';
    public static host:string = '192.168.56.102';
    public static port:number = 3000;
    public static baseUrl:string = '/';

    public static readonly deltaMonth:number = 6;
    constructor() {

    }
}
