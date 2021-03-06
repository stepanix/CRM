import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule,FormControl } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { SalesReportRoutingModule } from './salesreport-routing.module';
import { SalesReportComponent } from './salesreport.component';
import { PageHeaderModule } from './../shared';
import {CheckboxModule,DialogModule,DropdownModule,DataTableModule,SharedModule,
    ListboxModule,ScheduleModule,AutoCompleteModule,CalendarModule} from 'primeng/primeng';
import {DataGridModule,PanelModule,ChartModule} from 'primeng/primeng';
import {PlaceServiceApi,ScheduleServiceApi,UserServiceApi,FormServiceApi,OrderItemServiceApi} from '../shared/shared';
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
        SalesReportRoutingModule,
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
        PanelModule,
        ChartModule
    ],
    declarations: [SalesReportComponent],
    providers: [PlaceServiceApi,ScheduleServiceApi,GlobalApi,UserServiceApi,FormServiceApi,OrderItemServiceApi]
})
export class SalesReportModule { }