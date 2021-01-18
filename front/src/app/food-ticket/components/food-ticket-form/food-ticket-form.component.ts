import {ChangeDetectionStrategy, ChangeDetectorRef, Component, Inject, LOCALE_ID} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Observable, of} from 'rxjs';
import {flatMap} from 'rxjs/operators';
import {AbstractFormComponent} from '../../../shared/models/abstract-form-component';
import {FoodTicket} from '../../../shared/models/food-ticket';
import {InputErrorMessageModel} from '../../../shared/models/input-error-model';
import {DataService} from '../../../shared/services/data.service';

@Component({
    selector: 'food-ticket-form',
    templateUrl: './food-ticket-form.component.html',
    styleUrls: ['./food-ticket-form.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FoodTicketFormComponent extends AbstractFormComponent {
    public curFoodTicket:FoodTicket;

    constructor(
        @Inject(LOCALE_ID) public locale: string,
        protected _cd:ChangeDetectorRef,
        private _route: ActivatedRoute,
        private _router:Router,
        private _dataService:DataService,
    ) {
        super(_cd);
    }

    ngOnInit(): void {
        super.ngOnInit();

        this.addSub = this._route.data.pipe(flatMap(data => {
            let obs:Observable<FoodTicket>;
            if(data.action == 'edit') {
                obs = this.retrieveFoodTicket();
            } else {
                obs = of(new FoodTicket());
            }

            return obs;
        })).subscribe(ft => {
            this.curFoodTicket = ft;

            this._cd.markForCheck();
        });
    }

    public retrieveFoodTicket():Observable<FoodTicket> {
        return this._route.params.pipe(flatMap(param => {
            return this._dataService.getFoodTicket(param.id);
        }));
    }

    public back() {
        this._router.navigate(['/food-ticket']);
    }

    public save() {
        this.addSub = this._dataService.saveFoodTicket(this.curFoodTicket).subscribe(res => {
            if(res.affectedRows > 0) {
                this.back();
            }
        });
    }


    public getErrorMessages(code:string):InputErrorMessageModel[] {
        let messages:InputErrorMessageModel[] = [];

        if(code == 'date') {
            messages.push(new InputErrorMessageModel({code:'required', message:'Date requise'}));
        } else if(code == 'amount') {
            messages.push(new InputErrorMessageModel({code:'required', message:'Montant requis'}));
            messages.push(new InputErrorMessageModel({code:'min', message:'Doit être plus grand que {min}€'}));
        }

        return messages;
    }

}
