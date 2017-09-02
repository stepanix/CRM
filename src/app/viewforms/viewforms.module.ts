import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ViewFormsRoutingModule } from './viewforms-routing.module';
import { ViewFormsComponent } from './viewforms.component';
import { PageHeaderModule } from './../shared';
import {DataTableModule,SharedModule} from 'primeng/primeng';
import {FormServiceApi} from '../shared/shared';


@NgModule({
    imports: [
        ReactiveFormsModule,
        FormsModule,
        CommonModule,
        ViewFormsRoutingModule,
        PageHeaderModule,
        DataTableModule,
        SharedModule
    ],
    declarations: [ViewFormsComponent],
    providers: [FormServiceApi]
})

export class ViewFormsModule { }