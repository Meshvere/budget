import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {PelletsFormComponent} from './components/pellets-form/pellets-form.component';
import {PelletsComponent} from './components/pellets/pellets.component';
import {PelletsRoutingModule} from './pellets-routing.module';



@NgModule({
    declarations: [PelletsComponent, PelletsFormComponent],
    imports: [
        CommonModule,
        PelletsRoutingModule,
    ],
    exports: [PelletsFormComponent, PelletsComponent]
})
export class PelletsModule { }
