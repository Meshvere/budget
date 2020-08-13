import { Component, OnInit, Input, ChangeDetectorRef } from '@angular/core';
import {ComponentInit} from 'src/app/shared/models/component-init';
import {DataService} from 'src/app/shared/services/data.service';
import {IconService} from 'src/app/ui/services/icon.service';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-recette-form',
  templateUrl: './recette-form.component.html',
  styleUrls: ['./recette-form.component.scss']
})
export class RecetteFormComponent extends ComponentInit {
  @Input() public id:string
  constructor(
    protected _cd:ChangeDetectorRef,
    private _route: ActivatedRoute,
    private _dataService:DataService,
    public icon:IconService,
  ) {
    super(_cd);

    this.addSub = this._route.params.subscribe(param => {
      console.log(param)
    });
  }

  ngOnInit(): void {
  }

}
