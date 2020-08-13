import {ChangeDetectorRef,Component} from '@angular/core';
import {ComponentInit} from 'src/app/shared/models/component-init';
import {Recette} from 'src/app/shared/models/recette';
import {DataService} from 'src/app/shared/services/data.service';
import {IconService} from 'src/app/ui/services/icon.service';

@Component({
    selector: 'app-recette',
    templateUrl: './recette.component.html',
    styleUrls: ['./recette.component.scss']
})
export class RecetteComponent extends ComponentInit {
  public recette:Recette[] = [];

    constructor(
      protected _cd:ChangeDetectorRef,
      private _dataService:DataService,
      public icon:IconService,
    ) {
      super(_cd);
    }

    ngOnInit(): void {
      this.addSub = this._dataService.getRecette().subscribe(rec => {
        this.recette = rec;

        this._cd.markForCheck();
      })
    }
}
