import {ChangeDetectionStrategy, ChangeDetectorRef, Component, Inject, LOCALE_ID} from '@angular/core';
import {ActivatedRoute, Data, Router} from '@angular/router';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {Observable, of} from 'rxjs';
import {flatMap} from 'rxjs/operators';
import {AbstractFormComponent} from '../../../shared/models/components/abstract-form-component';
import {Outcome} from '../../../shared/models/entities/outcome';
import {Recipient} from '../../../shared/models/entities/recipient';
import {GroupSelectLabelsModel, SelectModel} from '../../../shared/models/select-model';
import {DataService} from '../../../shared/services/data.service';
import {Toast} from '../../../toast/models/toast';
import {ToastService} from '../../../toast/services/toast.service';
import {RecipientModalComponent} from '../recipient-modal/recipient-modal.component';

@Component({
    selector: 'outcome-form',
    templateUrl: './outcome-form.component.html',
    styleUrls: ['./outcome-form.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class OutcomeFormComponent extends AbstractFormComponent {
    public curOutcome:Outcome;
    public account:SelectModel[] = [];
    public recipients:SelectModel[] = [];
    public recipientGroupLabels:GroupSelectLabelsModel[] = [];

    constructor(
        @Inject(LOCALE_ID) public locale: string,
        protected _cd:ChangeDetectorRef,
        private _route: ActivatedRoute,
        private _router:Router,
        private _dataService:DataService,
        private _modalService: NgbModal,
    ) {
        super(_cd);

        this.recipientGroupLabels.push(new GroupSelectLabelsModel({code:'primary', label: 'Régulier'}));
        this.recipientGroupLabels.push(new GroupSelectLabelsModel({code:'secondary', label: 'Occasionnel'}));

        this.addSub = this._dataService.getAccounts().subscribe(acc => {
            let list:SelectModel[] = [];

            acc.forEach(item => {
                list.push(new SelectModel({value:item, label:item}));
            });

            this.account = list;

            this._cd.markForCheck();
        });

        this._getRecipients();

        this.addSub = this._route.data.pipe(flatMap((data:Data) => {
            let obs:Observable<Outcome>;
            if(data.action == 'edit') {
                obs = this.retrieveOutcome();
            } else {
                obs = of(new Outcome());
            }

            return obs;
        })).subscribe(outcome => {
            this.curOutcome = outcome;

            this._cd.markForCheck();
        });
    }

    private _getRecipients(recipient:Recipient = undefined) {
        this.addSub = this._dataService.getRecipients().subscribe((rec:Recipient[]) => {
            let list:SelectModel[] = [];

            rec.forEach(item => {
                list.push(new SelectModel({value:item.id, label:item.label, group:item.main?'primary':'secondary'}));
                if(recipient != undefined && item.label == recipient.label) {
                    this.curOutcome.recipient = item.id;
                }
            });

            this.recipients = list;

            this._cd.markForCheck();
        });
    }

    public retrieveOutcome():Observable<Outcome> {
        return this._route.params.pipe(flatMap(param => {
            return this._dataService.getOutcome(param.id);
        }));
    }

    public back() {
        this._router.navigate(['/outcome']);
    }

    public save() {
        this.addSub = this._dataService.saveOutcome(this.curOutcome).subscribe(res => {
            ToastService.addToast('Recette', 'Recette enregistrée', Toast.SUCCESS);

            this.back();
        });
    }

    public valueChange(value:any, prop:string) {
        this.curOutcome[prop] = value;

        if(prop == 'recurrent') {
            let reset:string[] = [];

            if(this.curOutcome.recurrent) {
                reset.push('date', 'waiting');
            } else {
                reset.push('recurrent_day', 'recurrent_start', 'recurrent_stop');
            }

            reset.forEach(prop => this.curOutcome[prop] = undefined);
        }

        this._cd.markForCheck();
    }

    public addRecipient() {
        this._modalService.open(RecipientModalComponent, { centered: true }).result.then((recipient:Recipient) => {
            this._getRecipients(recipient);
        });
    }
}
