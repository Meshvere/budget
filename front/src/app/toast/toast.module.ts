import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {ToastComponent} from './components/toast/toast.component';
import {ToasterComponent} from './components/toaster/toaster.component';
import {ToastService} from './services/toast.service';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';



@NgModule({
    declarations: [
        ToastComponent,
        ToasterComponent,
    ],
    imports: [
        CommonModule,
        FontAwesomeModule,
    ],
    exports: [
        ToastComponent,
        ToasterComponent,
    ],
    entryComponents: [
        ToastComponent,
        ToasterComponent,
    ],
    providers: [
        ToastService,
    ]
})
export class ToastModule { }
