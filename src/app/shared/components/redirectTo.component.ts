import { Component, OnInit } from '@angular/core';
import { Router , ActivatedRoute } from '@angular/router';

@Component({
    selector: 'my-redirect-to',
    template: ''
})
export class RedirectToComponent implements OnInit {

    constructor(
        private _router: Router,
        private _route: ActivatedRoute
    ) { }

    public ngOnInit() {
        this._route.data.subscribe((data) => {
            this._router.navigate([data.to], { preserveQueryParams: true });
        });
    }
}
