import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef, Input } from '@angular/core';
import {IconDefinition} from '@fortawesome/fontawesome-svg-core';
import {AbstractComponent} from '../../models/abstract-component';
import {ToastService} from 'src/app/ui/services/toast.service';
import {InputErrorModel, InputErrorMessageModel} from '../../models/input-error-model';

@Component({
    selector: 'form-input-container',
    templateUrl: './form-input-container.component.html',
    styleUrls: ['./form-input-container.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class FormInputContainerComponent extends AbstractComponent implements OnInit {
    @Input() public label:string;
    @Input() public icon:IconDefinition;
    @Input() public iconPosition:string = 'before';
    @Input() public fullWidth:boolean = false;
    @Input() public message:string;

    @Input() public errorMessages:InputErrorMessageModel[] = [];

    public errorList:string[] = [];

    private _errors: InputErrorModel;
    @Input() public get errors(): InputErrorModel {
        return this._errors;
    }
    public set errors(value: InputErrorModel) {
        this._errors=value;

        this.errorList = [];

        if(value != undefined && value.errors) {
            for(let code in value.errors) {
                // console.log(this.errorMessages)
                // console.log(code)
                this.errorMessages.filter(item => item.code == code).forEach(item => {
                    this.errorList.push(item.message);
                });
                // console.log(this.errorList)
            };
        }

        this._cd.markForCheck();
    }

    constructor(
        protected _cd:ChangeDetectorRef,
        protected _toastService:ToastService,
    ) {
        super(_cd, _toastService);
    }
}
