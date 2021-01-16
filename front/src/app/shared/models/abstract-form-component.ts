import {ChangeDetectorRef, Directive} from '@angular/core';
import {Subscription} from 'rxjs';
import {AbstractComponent} from './abstract-component';
import {InputErrorMessageModel, InputErrorModel} from './input-error-model';

@Directive()
export class AbstractFormComponent extends AbstractComponent {
    protected _subs:Subscription[] = [];

    public validations:{code:string, validation:InputErrorModel}[] = [];

    constructor(
        protected _cd:ChangeDetectorRef,
    ) {
        super(_cd);
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

        return messages;
    }

    public valueChange(value:any, prop:string) {
        this._cd.markForCheck();
    }
}
