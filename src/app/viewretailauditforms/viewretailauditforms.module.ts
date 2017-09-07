import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ViewRetailAuditFormsRoutingModule } from './viewretailauditforms-routing.module';
import { ViewRetailAuditFormsComponent } from './viewretailauditforms.component';
import { PageHeaderModule } from './../shared';
import {DataTableModule,SharedModule} from 'primeng/primeng';
import {RetailAuditFormServiceApi} from '../shared/shared';


@NgModule({
    imports: [
        ReactiveFormsModule,
        FormsModule,
        CommonModule,
        ViewRetailAuditFormsRoutingModule,
        PageHeaderModule,
        DataTableModule,
        SharedModule
    ],
    declarations: [ViewRetailAuditFormsComponent],
    providers: [RetailAuditFormServiceApi]
})

export class ViewRetailAuditFormsModule { }