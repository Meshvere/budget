import {ChangeDetectionStrategy,ChangeDetectorRef,Component} from '@angular/core';
import {FormControl} from '@angular/forms';
import {ActivatedRoute} from '@angular/router';
import {ComponentInit} from 'src/app/shared/models/component-init';
import {Income} from 'src/app/shared/models/income';
import {DataService} from 'src/app/shared/services/data.service';
import {Toast} from 'src/app/ui/models/toast';
import {IconService} from 'src/app/ui/services/icon.service';
import {ToastService} from 'src/app/ui/services/toast.service';

@Component({
  selector: 'app-income-form',
  templateUrl: './income-form.component.html',
  styleUrls: ['./income-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class IncomeFormComponent extends ComponentInit {
  public curIncome:Income;
  public account:string[] = [];

  public dateFrm:FormControl = new FormControl();
  public accountFrm:FormControl = new FormControl();
  public montantFrm:FormControl = new FormControl();
  public partageFrm:FormControl = new FormControl();
  public waitingFrm:FormControl = new FormControl();
  public commentFrm:FormControl = new FormControl();

  constructor(
    protected _cd:ChangeDetectorRef,
    protected _toastService:ToastService,
    private _route: ActivatedRoute,
    private _dataService:DataService,
    public icon:IconService,
  ) {
    super(_cd, _toastService);

    this.addSub = this._dataService.getAccounts().subscribe(acc => {
      this.account = acc;

      this._cd.markForCheck();
    })

    this.addSub = this._route.params.subscribe(param => {
      this._toastService.addToast('Recette', 'Recette en cours de chargement', Toast.LOADING);

      this._cd.markForCheck();

      this.addSub = this._dataService.incomeLoaded$.subscribe(loaded => {
        if(loaded) {
          this._dataService.getIncome(param.id).subscribe(rec => {
            this.curIncome = rec;
            this._toastService.addToast('Recette', 'Recette récupérée', Toast.SUCCESS);

            this._cd.markForCheck();
          });
        }
      });
    });
  }

  ngOnInit(): void {
    super.ngOnInit();
  }
}
