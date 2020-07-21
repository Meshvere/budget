import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {UiModule} from '../ui/ui.module';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    FontAwesomeModule,
        RouterModule,
        NgbModule,
        UiModule,
  ],
  exports: [
    FontAwesomeModule,
        RouterModule,
        NgbModule,
        UiModule,
  ]
})
export class SharedModule { }
