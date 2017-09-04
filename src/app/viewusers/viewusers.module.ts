import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ViewUsersRoutingModule } from './viewusers-routing.module';
import { ViewUsersComponent } from './viewusers.component';
import { PageHeaderModule } from './../shared';
import {DataTableModule,SharedModule,DialogModule} from 'primeng/primeng';
import {UserServiceApi,TenantServiceApi} from '../shared/shared';
import {GlobalApi} from '../shared/global-functions';


@NgModule({
    imports: [
        ReactiveFormsModule,
        FormsModule,
        CommonModule,
        DialogModule,
        ViewUsersRoutingModule,
        PageHeaderModule,
        DataTableModule,
        SharedModule
    ],
    declarations: [ViewUsersComponent],
    providers: [UserServiceApi,TenantServiceApi,GlobalApi]
})

export class ViewUsersModule { }