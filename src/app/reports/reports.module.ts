import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule,FormControl } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ReportsRoutingModule } from './reports-routing.module';
import { ReportsComponent } from './reports.component';
import { PageHeaderModule } from './../shared';
import {CheckboxModule,DialogModule,DropdownModule,DataTableModule,SharedModule,
    ListboxModule,ScheduleModule,AutoCompleteModule,CalendarModule} from 'primeng/primeng';
import {PlaceServiceApi,ScheduleServiceApi,UserServiceApi} from '../shared/shared';
import { DatepickerModule } from 'angular2-material-datepicker'
import { NguiDatetimePickerModule } from '@ngui/datetime-picker';

import {GlobalApi} from '../shared/global-functions';
import * as jQuery from 'jquery';
(window as any).jQuery = (window as any).$ = jQuery;

@NgModule({
    imports: [
        ReactiveFormsModule,        
        FormsModule,
        CommonModule,
        ReportsRoutingModule,
        PageHeaderModule,
        DialogModule,
        DropdownModule,
        DataTableModule,
        SharedModule,
        ScheduleModule,
        ListboxModule,
        CheckboxModule,
        CalendarModule,
        AutoCompleteModule,
        DatepickerModule,
        NguiDatetimePickerModule
    ],
    declarations: [ReportsComponent],
    providers: [PlaceServiceApi,ScheduleServiceApi,GlobalApi,UserServiceApi]
})
export class ReportsModule { }