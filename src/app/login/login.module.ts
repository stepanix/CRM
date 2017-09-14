import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { LoginRoutingModule } from './login-routing.module';
import { LoginComponent } from './login.component';
import {LoginServiceApi} from '../shared/shared';
import {BusyModule} from 'angular2-busy';

@NgModule({
    imports: [
        CommonModule,
        LoginRoutingModule,
        FormsModule,
        BusyModule
    ],
    declarations: [LoginComponent],
    providers: [LoginServiceApi]
})
export class LoginModule {
}
