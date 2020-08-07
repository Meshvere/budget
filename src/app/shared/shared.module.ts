import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import {UiModule} from '../ui/ui.module';
import {RedirectToComponent} from './components/redirectTo.component';


@NgModule({
    declarations: [
      RedirectToComponent,
    ],
    imports: [
        CommonModule,
        FontAwesomeModule,
        RouterModule,
        UiModule,
    ],
    exports: [
        FontAwesomeModule,
        RouterModule,
        UiModule,
        RedirectToComponent,
    ],
    entryComponents: [
      RedirectToComponent,
    ]
})
export class SharedModule { }
