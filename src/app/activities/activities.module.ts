import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ActivitiesRoutingModule } from './activities-routing.module';
import { ActivitiesComponent } from './activities.component';
import { PageHeaderModule } from './../shared';
import {DialogModule,DropdownModule,DataTableModule,SharedModule} from 'primeng/primeng';
import {FormServiceApi} from '../shared/shared';
import {GlobalApi} from '../shared/global-functions';

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
        SharedModule
    ],
    declarations: [ActivitiesComponent],
    providers: [FormServiceApi]
})
export class ActivitiesModule { }