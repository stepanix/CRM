import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ViewProductsRoutingModule } from './viewproducts-routing.module';
import { ViewProductsComponent } from './viewproducts.component';
import { PageHeaderModule } from './../shared';
import {DataTableModule,SharedModule,DialogModule} from 'primeng/primeng';
import {ProductServiceApi} from '../shared/shared';


@NgModule({
    imports: [
        ReactiveFormsModule,
        FormsModule,
        CommonModule,
        DialogModule,
        ViewProductsRoutingModule,
        PageHeaderModule,
        DataTableModule,
        SharedModule
    ],
    declarations: [ViewProductsComponent],
    providers: [ProductServiceApi]
})

export class ViewProductsModule { }