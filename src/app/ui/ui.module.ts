import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import {NavComponent} from './components/nav/nav.component';
import {ToastComponent} from './components/toast/toast.component';
import {PageComponent} from './pages/page/page.component';
import {IconService} from './services/icon.service';
import {ToastService} from './services/toast.service';
import { ToasterComponent } from './components/toaster/toaster.component';



@NgModule({
    declarations: [
        NavComponent,
        PageComponent,
        ToastComponent,
        ToasterComponent,
    ],
    imports: [
        CommonModule,
        RouterModule,
        FontAwesomeModule,
    ],
    exports: [
        FontAwesomeModule,
        NavComponent,
        PageComponent,
        ToastComponent,
    ],
    entryComponents: [
        NavComponent,
        PageComponent,
        ToastComponent,
    ],
    providers: [
      IconService,
      ToastService,
    ]
})
export class UiModule { }
