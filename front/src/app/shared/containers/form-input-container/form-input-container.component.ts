import {ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {IconDefinition} from '@fortawesome/fontawesome-svg-core';
import {AbstractComponent} from '../../models/abstract-component';
import {InputErrorMessageModel, InputErrorModel} from '../../models/input-error-model';
import {UtilsService} from '../../services/utils.service';

@Component({
    selector: 'form-input-container',
    templateUrl: './form-input-container.component.html',
    styleUrls: ['./form-input-container.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class FormInputContainerComponent extends AbstractComponent implements OnInit {
    public inputId:string = 'toggleFormInputContainer_' + UtilsService.uniqId();

    @Input() public showAsCard:boolean = false;

    @Input() public label:string;
    @Input() public icon:IconDefinition;
    @Input() public iconPosition:string = 'before';
    @Input() public fullWidth:boolean = false;
    @Input() public message:string;

    @Output() public toggleEvent:EventEmitter<boolean> = new EventEmitter();
    @Input() public togglable:boolean = false;
    private _openState: boolean=false;
    @Input()
    public get openState(): boolean {
        return this._openState;
    }
    public set openState(value: boolean) {
        this._openState=value;

        this.toggleEvent.emit(value);

        this._cd.markForCheck();
    }

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
                this.errorMessages.filter(item => item.code == code).forEach(item => {
                    this.errorList.push(item.message);
                });
            };
        }

        this._cd.markForCheck();
    }

    public get showGroup():boolean {
        return (this.togglable && this.openState) || (!this.togglable && !this.openState);
    }

    constructor(
        protected _cd:ChangeDetectorRef,
    ) {
        super(_cd);
    }
}
