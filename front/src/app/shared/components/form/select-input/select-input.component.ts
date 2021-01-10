import {ChangeDetectionStrategy, ChangeDetectorRef, Component, Input} from '@angular/core';
import {AbstractInputComponent} from '../../../models/abstract-input-component.component';
import {SelectModel, GroupSelectModel, GroupSelectLabelsModel} from '../../../models/select-model';
import {UtilsService} from '../../../services/utils.service';

@Component({
  selector: 'select-input',
  templateUrl: './select-input.component.html',
  styleUrls: ['./select-input.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SelectInputComponent extends AbstractInputComponent {
    @Input() public values:SelectModel[] = [];
    @Input() public labelType:string = 'raw';

    @Input() public groupLabels:GroupSelectLabelsModel[] = [];

    public get groupedValues():GroupSelectModel[] {
        let groups:GroupSelectModel[] = [];

        this.values.forEach(value => {
            let grp:GroupSelectModel = groups.filter(curGrp => curGrp.code == value.group)[0];

            if(grp == undefined) {
                grp = new GroupSelectModel({code: value.group});

                groups.push(grp);
            }

            grp.values.push(value);
        });

        return groups;
    }

    constructor(
        protected _cd:ChangeDetectorRef,
    ) {
        super(_cd);
    }

    public formatLabel(value:any):any {
        if(this.labelType == 'raw') {
            return value;
        } else if(['date', 'month'].indexOf(this.labelType) >= 0) {
            return UtilsService.dateToString(value, this.labelType != 'month');
        } else if(this.labelType == 'money') {
            return UtilsService.currencyToString(value);
        } else {
            return value;
        }
    }

    public getGroupLabel(code:string):string {
        let group:GroupSelectLabelsModel = this.groupLabels.filter(grp => grp.code == code)[0];

        return group != undefined?group.label:code;
    }
}
