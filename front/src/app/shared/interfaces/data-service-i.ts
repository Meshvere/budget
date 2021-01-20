import {Observable} from 'rxjs/internal/Observable';
import {AbstractEntity} from '../models/entities/abstract-entity';
import {BackResponse} from '../models/back-response';

export interface DataServiceI {
    toastTitle:string;

    getOneById(id:number): Observable<AbstractEntity>;
    getAll(): Observable<AbstractEntity[]>;
    save(ae:AbstractEntity):Observable<BackResponse>;
    deleteOneById(id:number);
}
