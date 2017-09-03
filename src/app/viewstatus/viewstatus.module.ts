import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ViewStatusRoutingModule } from './viewstatus-routing.module';
import { ViewStatusComponent } from './viewstatus.component';
import { PageHeaderModule } from './../shared';
import {DataTableModule,SharedModule,DialogModule} from 'primeng/primeng';
import {StatusServiceApi} from '../shared/shared';


@NgModule({
    imports: [
        ReactiveFormsModule,
        FormsModule,
        CommonModule,
        DialogModule,
        ViewStatusRoutingModule,
        PageHeaderModule,
        DataTableModule,
        SharedModule
    ],
    declarations: [ViewStatusComponent],
    providers: [StatusServiceApi]
})

export class ViewStatusModule { }