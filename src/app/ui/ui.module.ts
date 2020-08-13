import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavComponent } from './components/nav/nav.component';
import { PageComponent } from './pages/page/page.component';
import {RouterModule} from '@angular/router';
import {IconService} from './services/icon.service';



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
    ],
    providers: [
      IconService,
    ]
})
export class UiModule { }
