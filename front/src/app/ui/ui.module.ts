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
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { ContentComponent } from './components/content/content.component';
import {SharedModule} from '../shared/shared.module';



@NgModule({
    declarations: [
        NavComponent,
        PageComponent,
        ToastComponent,
        ToasterComponent,
        ContentComponent,
    ],
    imports: [
        CommonModule,
        RouterModule,
        FontAwesomeModule,
        NgbModule,
        SharedModule,
    ],
    exports: [
        FontAwesomeModule,
        NavComponent,
        PageComponent,
        ToastComponent,
        ContentComponent,
    ],
    entryComponents: [
        NavComponent,
        PageComponent,
        ToastComponent,
        ContentComponent,
    ],
    providers: [
      IconService,
      ToastService,
    ]
})
export class UiModule { }
