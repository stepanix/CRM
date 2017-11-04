import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ActivitiesRoutingModule } from './activities-routing.module';
import { ActivitiesComponent } from './activities.component';
import { PageHeaderModule } from './../shared';
import {DialogModule,DropdownModule,DataTableModule,SharedModule,AutoCompleteModule,DataListModule} from 'primeng/primeng';
import {FormServiceApi} from '../shared/shared';
import {GlobalApi} from '../shared/global-functions';
import { NguiDatetimePickerModule } from '@ngui/datetime-picker';
import {PlaceServiceApi,UserServiceApi,ActivityServiceApi} from '../shared/shared';
// import {FormValueServiceApi,PhotoServiceApi,ScheduleServiceApi} from '../shared/shared';
// import {NoteServiceApi,ProductAuditRetailServiceApi} from '../shared/shared';

@NgModule({
    imports: [
        ReactiveFormsModule,
        FormsModule,
        CommonModule,
        ActivitiesRoutingModule,
        PageHeaderModule,
        DialogModule,
        DropdownModule,
        DataTableModule,
        SharedModule,
        NguiDatetimePickerModule,
        AutoCompleteModule,
        DataListModule,
    ],
    declarations: [ActivitiesComponent],
    providers: [PlaceServiceApi,
        UserServiceApi,
        ActivityServiceApi]
})
export class ActivitiesModule { }