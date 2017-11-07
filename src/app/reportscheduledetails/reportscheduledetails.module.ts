import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule,FormControl } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ReportScheduleDetailsRoutingModule } from './reportscheduledetails-routing.module';
import { ReportScheduleDetailsComponent } from './reportscheduledetails.component';
import { PageHeaderModule } from './../shared';
import {CheckboxModule,DialogModule,DropdownModule,DataTableModule,SharedModule,
    ListboxModule,ScheduleModule,AutoCompleteModule,CalendarModule} from 'primeng/primeng';
import {DataGridModule,PanelModule} from 'primeng/primeng';
import {PlaceServiceApi,ScheduleServiceApi,UserServiceApi,FormValueServiceApi} from '../shared/shared';
import { DatepickerModule } from 'angular2-material-datepicker'
import { NguiDatetimePickerModule } from '@ngui/datetime-picker';
import { ChartsModule } from 'ng2-charts';
import {BusyModule} from 'angular2-busy';


import {GlobalApi} from '../shared/global-functions';
import * as jQuery from 'jquery';
(window as any).jQuery = (window as any).$ = jQuery;

@NgModule({
    imports: [
        ReactiveFormsModule,        
        FormsModule,
        CommonModule,
        ReportScheduleDetailsRoutingModule,
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
        NguiDatetimePickerModule,
        ChartsModule,
        DataGridModule,
        BusyModule,
        PanelModule
    ],
    declarations: [ReportScheduleDetailsComponent],
    providers: [PlaceServiceApi,ScheduleServiceApi,GlobalApi,UserServiceApi,FormValueServiceApi]
})
export class ReportScheduleDetailsModule { }