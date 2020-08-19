import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavComponent } from './components/nav/nav.component';
import { PageComponent } from './pages/page/page.component';
import {RouterModule} from '@angular/router';
import {IconService} from './services/icon.service';
import { ToastComponent } from './components/toast/toast.component';
import {ToastService} from './services/toast.service';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';



@NgModule({
    declarations: [
        NavComponent,
        PageComponent,
        ToastComponent,
    ],
    imports: [
        CommonModule,
        RouterModule,
        FontAwesomeModule,
    ],
    exports: [
        NavComponent,
        PageComponent,
        ToastComponent,
        FontAwesomeModule,
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
