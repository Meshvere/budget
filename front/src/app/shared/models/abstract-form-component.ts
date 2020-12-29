import {ChangeDetectorRef, Directive, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from 'rxjs';
import {AbstractComponent} from './abstract-component';
import {IconService} from '../../ui/services/icon.service';
import {IconDefinition} from '@fortawesome/fontawesome-svg-core';
import {InputErrorModel, InputErrorMessageModel} from './input-error-model';

@Directive()
export class AbstractFormComponent extends AbstractComponent {
    protected _subs:Subscription[] = [];

    public validations:{code:string, validation:InputErrorModel}[] = [];

    constructor(
        protected _cd:ChangeDetectorRef,
        protected _iconService:IconService,
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

    public getIcon(name:string):IconDefinition {
        return this._iconService[name];
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
}
