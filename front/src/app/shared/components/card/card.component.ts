import {ChangeDetectionStrategy,ChangeDetectorRef,Component,Input,OnDestroy,OnInit} from '@angular/core';

@Component({
    selector: 'card',
    templateUrl: './card.component.html',
    styleUrls: ['./card.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class CardComponent implements OnInit, OnDestroy {
    @Input() public title:string;

    constructor(
        private _cd:ChangeDetectorRef,
    ) { }

    ngOnInit(): void {
    }

    ngOnDestroy(): void {
    }

}
