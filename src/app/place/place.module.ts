import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { PlaceRoutingModule } from './place-routing.module';
import { PlaceComponent } from './place.component';
import { PageHeaderModule } from './../shared';
import {DialogModule,DropdownModule,DataTableModule,SharedModule} from 'primeng/primeng';
import {PlaceServiceApi,StatusServiceApi} from '../shared/shared';
import {GlobalApi} from '../shared/global-functions';
import {GooglePlaceModule} from 'ng2-google-place-autocomplete';


@NgModule({
    imports: [
        ReactiveFormsModule,
        FormsModule,
        CommonModule,
        PlaceRoutingModule,
        PageHeaderModule,
        DialogModule,
        DropdownModule,
        DataTableModule,
        SharedModule,
        GooglePlaceModule
    ],
    declarations: [PlaceComponent],
    providers: [PlaceServiceApi,StatusServiceApi,GlobalApi]
})
export class PlaceModule { }