import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {UiModule} from '../ui/ui.module';
import {ShoppingFormComponent} from './components/shopping-form/shopping-form.component';
import {ShoppingComponent} from './components/shopping/shopping.component';
import {ShoppingRoutingModule} from './shopping-routing.module';
import {ShoppingService} from './services/shopping.service';



@NgModule({
    declarations: [
        ShoppingComponent,
        ShoppingFormComponent
    ],
    imports: [
        CommonModule,
        ShoppingRoutingModule,
        UiModule,
    ],
    exports: [
        ShoppingComponent,
        ShoppingFormComponent
    ],
    providers: [
        ShoppingService,
    ]
})
export class ShoppingModule { }
