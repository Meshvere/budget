import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class LocaleService {
    constructor() { }

    public getLanguage():string {
        return navigator.language || navigator['userLanguage'];
    }
}
