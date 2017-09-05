import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule,FormControl } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ScheduleRoutingModule } from './schedule-routing.module';
import { ScheduleComponent } from './schedule.component';
import { PageHeaderModule } from './../shared';
import {DialogModule,DropdownModule,DataTableModule,SharedModule,ListboxModule,ScheduleModule} from 'primeng/primeng';
import {PlaceServiceApi,ScheduleServiceApi,UserServiceApi} from '../shared/shared';
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
    ],
    declarations: [ScheduleComponent],
    providers: [PlaceServiceApi,ScheduleServiceApi,GlobalApi,UserServiceApi]
})
export class ScheduleViewModule { }