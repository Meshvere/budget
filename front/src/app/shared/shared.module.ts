import {CommonModule, JsonPipe} from '@angular/common';
import {HttpClientModule} from '@angular/common/http';
import {NgModule, LOCALE_ID} from '@angular/core';
import {FormsModule,ReactiveFormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {EmptyStateComponent} from './components/empty-state/empty-state.component';
import {CardComponent} from './components/card/card.component';
import {DateInputComponent} from './components/form/date-input/date-input.component';
import {RedirectToComponent} from './components/redirectTo.component';
import {FormInputContainerComponent} from './containers/form-input-container/form-input-container.component';
import {DataService} from './services/data.service';
import {TimeService} from './services/time.service';
import { NumberInputComponent } from './components/form/number-input/number-input.component';
import { SelectInputComponent } from './components/form/select-input/select-input.component';
import { BooleanInputComponent } from './components/form/boolean-input/boolean-input.component';
import {TextInputComponent} from './components/form/text-input/text-input.component';
import {UtilsService} from './services/utils.service';
import {LocaleService} from './services/locale.service';

@NgModule({
    declarations: [
        RedirectToComponent,
        EmptyStateComponent,
        DateInputComponent,
        CardComponent,
        FormInputContainerComponent,
        NumberInputComponent,
        SelectInputComponent,
        BooleanInputComponent,
        TextInputComponent,
    ],
    imports: [
        CommonModule,
        FontAwesomeModule,
        RouterModule,
        FormsModule,
        ReactiveFormsModule,
        HttpClientModule,
        NgbModule,
    ],
    exports: [
        FontAwesomeModule,
        RouterModule,
        FormsModule,
        ReactiveFormsModule,
        HttpClientModule,
        NgbModule,

        RedirectToComponent,
        EmptyStateComponent,
        DateInputComponent,
        CardComponent,
        FormInputContainerComponent,
        NumberInputComponent,
        SelectInputComponent,
        BooleanInputComponent,
        TextInputComponent,
        JsonPipe,
    ],
    entryComponents: [
        RedirectToComponent,
        EmptyStateComponent,
        DateInputComponent,
        CardComponent,
        FormInputContainerComponent,
        NumberInputComponent,
        TextInputComponent,
    ],
    providers: [
        {
            provide: LOCALE_ID,
            useFactory: (localeService: LocaleService) => {
                return localeService.getLanguage();
            },
            deps: [LocaleService]
        },
        DataService,
        TimeService,
        UtilsService,
        LocaleService,
        {
            provide: 'UTIL',
            useFactory: () => {
                return UtilsService;
            },
            deps: [LocaleService]
        },
    ]
})
export class SharedModule { }
