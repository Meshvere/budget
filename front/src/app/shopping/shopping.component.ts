import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';

@Component({
    selector: 'shopping',
    templateUrl: './shopping.component.html',
    styleUrls: ['./shopping.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ShoppingComponent implements OnInit {

    constructor(
        private _cd:ChangeDetectorRef,
    ) { }

    ngOnInit(): void {
    }

}
