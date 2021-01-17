import {ChangeDetectorRef, Directive, EventEmitter, Input, OnChanges, Output, SimpleChanges} from '@angular/core';
import {FormControl, ValidatorFn, Validators} from '@angular/forms';
import {AbstractComponent} from './abstract-component';
import {InputErrorModel} from './input-error-model';

@Directive()
export class AbstractInputComponent extends AbstractComponent implements OnChanges {
    protected _changeWatch:string[] = [];
    @Input() public needValidation:boolean = true;
    public valid:boolean;
    public errors:InputErrorModel;
    protected _validators:ValidatorFn[] = [];
    @Input() public required:boolean = false;
    @Input() public readOnly:boolean = false;
    @Input() public disabled:boolean = false;

    protected _value: any;

    @Input()
    public get value(): any {
        return this._value;
    }
    public set value(value: any) {
        this._value=value;

        if(this.frmCtrl != undefined) {
            this.frmCtrl.markAsTouched();
            this.frmCtrl.markAsDirty();
            this.frmCtrl.markAsPristine();
            this.frmCtrl.updateValueAndValidity();
        }

        this._validationChange();

        this._cd.markForCheck();
    }

    @Output() public valueChange:EventEmitter<any> = new EventEmitter();
    @Output() public validationChange:EventEmitter<any> = new EventEmitter();

    public frmCtrl:FormControl = new FormControl();

    public get ngClass():any {
        return {'is-valid':this.valid && this.needValidation, 'is-invalid':!this.valid && this.needValidation};
    }

    constructor(
        protected _cd:ChangeDetectorRef,
    ) {
        super(_cd);

        this._changeWatch.push('required');
    }

    public ngOnInit() {
        super.ngOnInit();

        if(this.needValidation) {
            this.addSub = this.frmCtrl.valueChanges.subscribe(val => this._validationChange());

            this._updateValidatorList();
            this._updateValidator();

            this.frmCtrl.markAsTouched();
            this.frmCtrl.markAsDirty();
            // this.frmCtrl.updateValueAndValidity();
            // this._validationChange();

            this._cd.markForCheck();
        }
    }

    public ngOnDestroy() {
        super.ngOnDestroy();
    }

    public ngOnChanges(changes: SimpleChanges) {
        this._changeWatch.forEach(item => {
            if(changes[item] && (changes[item].previousValue !== changes[item].currentValue || changes[item].isFirstChange)) {
                this._updateValidatorList();
                this._updateValidator();
            }
        });
    }

    public valueChanged($event) {
        this.valueChange.emit($event.target.value);

        this._cd.markForCheck();
    }

    protected _validationChange() {
        if(this.frmCtrl != undefined) {
            if(this.value == undefined) {
                this.valid = false;
            } else {
                this.valid = this.frmCtrl.valid;
            }
            this.errors = new InputErrorModel({valid: this.frmCtrl.valid, errors:this.frmCtrl.errors});

            this.validationChange.emit(this.errors);
        }

        this._cd.markForCheck();
    }

    protected _updateValidatorList() {
        this._validators = [];

        if(this.required) {
            this._validators.push(Validators.required);
        }
    }

    protected _updateValidator() {
        this.frmCtrl.clearValidators();
        this.frmCtrl.setValidators(this._validators);

        // this.frmCtrl.updateValueAndValidity();
    }
}
