import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {AngularFireModule} from '@angular/fire';
import {AngularFirestoreModule} from '@angular/fire/firestore';
import {FormsModule,ReactiveFormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import {environment} from '../../environments/environments.firebase';
import {UiModule} from '../ui/ui.module';
import {EmptyStateComponent} from './components/empty-state/empty-state.component';
import {RedirectToComponent} from './components/redirectTo.component';
import {DataService} from './services/data.service';


@NgModule({
    declarations: [
      RedirectToComponent,
      EmptyStateComponent,
    ],
    imports: [
        CommonModule,
        FontAwesomeModule,
        RouterModule,
        UiModule,
        FormsModule,
        ReactiveFormsModule,
        AngularFireModule.initializeApp(environment.firebase),
        AngularFirestoreModule,
    ],
    exports: [
        FontAwesomeModule,
        RouterModule,
        UiModule,
        FormsModule,
        ReactiveFormsModule,
        RedirectToComponent,
        AngularFireModule,
        AngularFirestoreModule,
        EmptyStateComponent,
    ],
    entryComponents: [
      RedirectToComponent,
      EmptyStateComponent,
    ],
    providers: [
      DataService,

    ]
})
export class SharedModule { }
