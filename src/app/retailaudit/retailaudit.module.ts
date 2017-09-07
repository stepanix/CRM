import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RetailAuditRoutingModule } from './retailaudit-routing.module';
import { RetailAuditComponent } from './retailaudit.component';
import { PageHeaderModule } from './../shared';
import {DialogModule,DropdownModule,DataTableModule,SharedModule} from 'primeng/primeng';
import {RetailAuditFormServiceApi,QuestionTypeApi} from '../shared/shared';
import {GlobalApi} from '../shared/global-functions';



@NgModule({
    imports: [
        ReactiveFormsModule,
        FormsModule,
        CommonModule,
        RetailAuditRoutingModule,
        PageHeaderModule,
        DialogModule,
        DropdownModule,
        DataTableModule,
        SharedModule
    ],
    declarations: [RetailAuditComponent],
    providers: [RetailAuditFormServiceApi,QuestionTypeApi,GlobalApi]
})
export class RetailAuditModule { }