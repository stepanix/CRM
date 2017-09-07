import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule,FormControl } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ScheduleRoutingModule } from './schedule-routing.module';
import { ScheduleComponent } from './schedule.component';
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
        ScheduleRoutingModule,
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
    declarations: [ScheduleComponent],
    providers: [PlaceServiceApi,ScheduleServiceApi,GlobalApi,UserServiceApi]
})
export class ScheduleViewModule { }