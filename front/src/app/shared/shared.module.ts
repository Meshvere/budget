import {CommonModule, JsonPipe} from '@angular/common';
import {HttpClientModule} from '@angular/common/http';
import {LOCALE_ID, NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {BtnComponent} from './components/btn/btn.component';
import {CardComponent} from './components/card/card.component';
import {EmptyStateComponent} from './components/empty-state/empty-state.component';
import {BooleanInputComponent} from './components/form/boolean-input/boolean-input.component';
import {DateInputComponent} from './components/form/date-input/date-input.component';
import {NumberInputComponent} from './components/form/number-input/number-input.component';
import {SelectInputComponent} from './components/form/select-input/select-input.component';
import {TextInputComponent} from './components/form/text-input/text-input.component';
import {RedirectToComponent} from './components/redirectTo.component';
import {FormInputContainerComponent} from './containers/form-input-container/form-input-container.component';
import {DataService} from './services/data.service';
import {LocaleService} from './services/locale.service';
import {TimeService} from './services/time.service';
import {UtilsService} from './services/utils.service';
import {ContentComponent} from './containers/content/content.component';
import {PageComponent} from './containers/page/page.component';
import {NavComponent} from './components/nav/nav.component';
import {ToastModule} from '../toast/toast.module';

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
        BtnComponent,
        ContentComponent,
        PageComponent,
        NavComponent,
    ],
    imports: [
        CommonModule,
        FontAwesomeModule,
        RouterModule,
        FormsModule,
        ReactiveFormsModule,
        HttpClientModule,
        NgbModule,
        ToastModule,
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
        BtnComponent,
        ContentComponent,
        PageComponent,
        NavComponent,
    ],
    entryComponents: [
        RedirectToComponent,
        EmptyStateComponent,
        DateInputComponent,
        CardComponent,
        FormInputContainerComponent,
        NumberInputComponent,
        TextInputComponent,
        BtnComponent,
        ContentComponent,
        PageComponent,
        NavComponent,
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
