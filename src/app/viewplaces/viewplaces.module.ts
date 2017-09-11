import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ViewPlacesRoutingModule } from './viewplaces-routing.module';
import { ViewPlacesComponent } from './viewplaces.component';
import { PageHeaderModule } from './../shared';
import {DataTableModule,SharedModule,DialogModule} from 'primeng/primeng';
import {PlaceServiceApi,StatusServiceApi} from '../shared/shared';
import {BusyModule} from 'angular2-busy';



@NgModule({
    imports: [
        ReactiveFormsModule,
        FormsModule,
        CommonModule,
        DialogModule,
        ViewPlacesRoutingModule,
        PageHeaderModule,
        DataTableModule,
        SharedModule,
        BusyModule
    ],
    declarations: [ViewPlacesComponent],
    providers: [PlaceServiceApi,StatusServiceApi]
})

export class ViewPlacesModule { }