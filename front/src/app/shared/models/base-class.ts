import {Directive} from '@angular/core';

@Directive()
export class BaseClass {
    public plopPublic:string = 'public';
    protected plopProtected:string = 'protected';
    private plopPrivate:string = 'private';
}
