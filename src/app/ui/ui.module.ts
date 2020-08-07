import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavComponent } from './components/nav/nav.component';
import { PageComponent } from './pages/page/page.component';
import {RouterModule} from '@angular/router';



@NgModule({
    declarations: [
        NavComponent,
        PageComponent,
    ],
    imports: [
        CommonModule,
        RouterModule,
    ],
    exports: [
        NavComponent,
        PageComponent,
    ],
    entryComponents: [
        NavComponent,
        PageComponent,
    ]
})
export class UiModule { }
