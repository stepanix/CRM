import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { FormRoutingModule } from './form-routing.module';
import { FormComponent } from './form.component';
import { PageHeaderModule } from './../shared';
import {DialogModule,DropdownModule,DataTableModule,SharedModule} from 'primeng/primeng';
import {FormServiceApi,QuestionTypeApi} from '../shared/shared';
import {GlobalApi} from '../shared/global-functions';



@NgModule({
    imports: [
        ReactiveFormsModule,
        FormsModule,
        CommonModule,
        FormRoutingModule,
        PageHeaderModule,
        DialogModule,
        DropdownModule,
        DataTableModule,
        SharedModule
    ],
    declarations: [FormComponent],
    providers: [FormServiceApi,QuestionTypeApi,GlobalApi]
})
export class FormModule { }