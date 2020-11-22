import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Router , ActivatedRoute } from '@angular/router';

@Component({
    selector: 'my-redirect-to',
    template: '',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class RedirectToComponent implements OnInit {

    constructor(
        private _router: Router,
        private _route: ActivatedRoute
    ) { }

    public ngOnInit() {
        this._route.data.subscribe((data) => {
            this._router.navigate([data.to], { queryParamsHandling: 'preserve' });
        });
    }
}
