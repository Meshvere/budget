import {ChangeDetectionStrategy, ChangeDetectorRef, Component, Inject, LOCALE_ID} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {IconDefinition} from '@fortawesome/fontawesome-svg-core';
import {Observable, of} from 'rxjs';
import {flatMap} from 'rxjs/operators';
import {AbstractComponent} from '../../../shared/models/abstract-component';
import {Income} from '../../../shared/models/income';
import {InputErrorMessageModel, InputErrorModel} from '../../../shared/models/input-error-model';
import {SelectModel} from '../../../shared/models/select-model';
import {DataService} from '../../../shared/services/data.service';
import {UtilsService} from '../../../shared/services/utils.service';
import {IconService} from '../../../ui/services/icon.service';
import {ToastService} from '../../../ui/services/toast.service';

@Component({
    selector: 'app-income-form',
    templateUrl: './income-form.component.html',
    styleUrls: ['./income-form.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class IncomeFormComponent extends AbstractComponent {
    public curIncome:Income;
    public account:SelectModel[] = [];

    public validations:{code:string, validation:InputErrorModel}[] = [];

    constructor(
        @Inject(LOCALE_ID) public locale: string,
        protected _cd:ChangeDetectorRef,
        protected _toastService:ToastService,
        private _route: ActivatedRoute,
        private _router:Router,
        private _dataService:DataService,
        public icon:IconService,
        protected _utilsService:UtilsService,
    ) {
        super(_cd, _toastService, _utilsService);
    }

    ngOnInit(): void {
        super.ngOnInit();

        this.addSub = this._dataService.getAccounts().subscribe(acc => {
            let list:SelectModel[] = [];

            acc.forEach(item => {
                list.push(new SelectModel({value:item, label:item}));
            });

            this.account = list;

            this._cd.markForCheck();
        });

        this.addSub = this._route.data.pipe(flatMap(data => {
            let obs:Observable<Income>;
            if(data.action == 'edit') {
                obs = this.retrieveIncome();
            } else {
                obs = of(new Income());
            }

            return obs;
        })).subscribe(income => {
            this.curIncome = income;

            this._cd.markForCheck();
        });
    }

    public retrieveIncome():Observable<Income> {
        return this._route.params.pipe(flatMap(param => {
            return this._dataService.getIncome(param.id);
        }));
    }

    public back() {
        this._router.navigate(['/income']);
    }

    public save() {
        this.addSub = this._dataService.saveIncome(this.curIncome).subscribe(res => {
            if(res.affectedRows > 0) {
                this.back();
            }
        });
    }

    public get formValid():boolean {
        let valid:boolean;

        for(let validation of this.validations) {
            valid = validation.validation.valid;

            if(!valid) {
                break;
            }
        }

        return valid;
    }

    public getIcon(name:string):IconDefinition {
        return this.icon[name];
    }

    public valueChange(value:any, prop:string) {
        this.curIncome[prop] = value;

        if(prop == 'recurrent') {
            let reset:string[] = [];

            if(this.curIncome.recurrent) {
                reset.push('date');
            } else {
                reset.push('recurrent_day', 'recurrent_start', 'recurrent_stop');
            }

            reset.forEach(prop => this.curIncome[prop] = undefined);
        }

        this._cd.markForCheck();
    }

    public validationChange($event, code:string) {
        this.validations = this.validations.filter(item => item.code != code);
        this.validations.push({code:code, validation:$event})
    }

    public getErrors(code:string):InputErrorModel {
        let errors:InputErrorModel;

        this.validations.forEach(item => {
            if(item.code == code) {
                errors = item.validation;
            }
        })

        return errors;
    }

    public getErrorMessages(code:string):InputErrorMessageModel[] {
        let messages:InputErrorMessageModel[] = [];

        if(code == 'date') {
            messages.push(new InputErrorMessageModel({code:'required', message:'Date requise'}));
        } else if(code == 'recurrent_day') {
            messages.push(new InputErrorMessageModel({code:'required', message:'Date requise'}));
            messages.push(new InputErrorMessageModel({code:'min', message:'Doit être plus grand ou égale à {min}'}));
            messages.push(new InputErrorMessageModel({code:'max', message:'Doit être plus petit ou égale à {max}'}));
        } else if(code == 'recurrent_start') {
            messages.push(new InputErrorMessageModel({code:'required', message:'Date requise'}));
            messages.push(new InputErrorMessageModel({code:'max', message:'Doit être antérieure à la date de fin'}));
        } else if(code == 'recurrent_stop') {
            messages.push(new InputErrorMessageModel({code:'required', message:'Date requise'}));
            messages.push(new InputErrorMessageModel({code:'max', message:'Doit être postérieure à la date de début'}));
        } else if(code == 'account') {
            messages.push(new InputErrorMessageModel({code:'required', message:'Compte requis'}));
        } else if(code == 'amount') {
            messages.push(new InputErrorMessageModel({code:'required', message:'Montant requis'}));
            messages.push(new InputErrorMessageModel({code:'min', message:'Doit être plus grand que {min}€'}));
        }

        return messages;
    }
}
