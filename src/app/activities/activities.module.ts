import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ActivitiesRoutingModule } from './activities-routing.module';
import { ActivitiesComponent } from './activities.component';
import { PageHeaderModule } from './../shared';
import {DialogModule,DropdownModule,DataTableModule,SharedModule,PanelModule} from 'primeng/primeng';
import {FormServiceApi} from '../shared/shared';
import {GlobalApi} from '../shared/global-functions';
import { NguiDatetimePickerModule } from '@ngui/datetime-picker';



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
        PanelModule
        
    ],
    declarations: [ActivitiesComponent],
    providers: [FormServiceApi]
})
export class ActivitiesModule { }