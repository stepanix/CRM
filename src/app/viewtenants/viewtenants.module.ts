import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ViewTenantsRoutingModule } from './viewtenants-routing.module';
import { ViewTenantsComponent } from './viewtenants.component';
import { PageHeaderModule } from './../shared';
import {DataTableModule,SharedModule,DialogModule} from 'primeng/primeng';
import {TenantServiceApi} from '../shared/shared';
import {GlobalApi} from '../shared/global-functions';
import {BusyModule} from 'angular2-busy';


@NgModule({
    imports: [
        ReactiveFormsModule,
        FormsModule,
        CommonModule,
        DialogModule,
        ViewTenantsRoutingModule,
        PageHeaderModule,
        DataTableModule,
        SharedModule,
        BusyModule
    ],
    declarations: [ViewTenantsComponent],
    providers: [TenantServiceApi,GlobalApi]
})

export class ViewTenantsModule { }