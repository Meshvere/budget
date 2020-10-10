import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {AngularFireModule} from '@angular/fire';
import {AngularFirestoreModule} from '@angular/fire/firestore';
import {FormsModule,ReactiveFormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import {environment} from '../../environments/environments.firebase';
import {EmptyStateComponent} from './components/empty-state/empty-state.component';
import {RedirectToComponent} from './components/redirectTo.component';
import {DataService} from './services/data.service';
import {TimeService} from './services/time.service';
import {HttpClientModule} from '@angular/common/http';
import { DateInputComponent } from './components/form/date-input/date-input.component';

@NgModule({
    declarations: [
        RedirectToComponent,
        EmptyStateComponent,
        DateInputComponent,
    ],
    imports: [
        CommonModule,
        FontAwesomeModule,
        RouterModule,
        FormsModule,
        ReactiveFormsModule,
        AngularFireModule.initializeApp(environment.firebase),
        AngularFirestoreModule,
        HttpClientModule,
        HttpClientModule,
    ],
    exports: [
        FontAwesomeModule,
        RouterModule,
        FormsModule,
        ReactiveFormsModule,
        AngularFireModule,
        AngularFirestoreModule,
        RedirectToComponent,
        EmptyStateComponent,
        HttpClientModule,
        HttpClientModule,
        DateInputComponent,
    ],
    entryComponents: [
        RedirectToComponent,
        EmptyStateComponent,
        DateInputComponent,
    ],
    providers: [
        DataService,
        TimeService,
    ]
})
export class SharedModule { }
