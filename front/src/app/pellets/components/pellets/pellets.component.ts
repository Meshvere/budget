import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
    selector: 'app-pellets',
    templateUrl: './pellets.component.html',
    styleUrls: ['./pellets.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class PelletsComponent implements OnInit {

    constructor() { }

    ngOnInit(): void {
    }

}
