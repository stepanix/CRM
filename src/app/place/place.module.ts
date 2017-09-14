import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule,FormControl } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { PlaceRoutingModule } from './place-routing.module';
import { PlaceComponent } from './place.component';
import { PageHeaderModule } from './../shared';
import {DialogModule,DropdownModule,DataTableModule,SharedModule,ListboxModule} from 'primeng/primeng';
import {PlaceServiceApi,StatusServiceApi,RepPlaceServiceApi,UserServiceApi} from '../shared/shared';
import {GlobalApi} from '../shared/global-functions';
import {GooglePlaceModule} from 'ng2-google-place-autocomplete';
import { MultiselectDropdownModule } from 'angular-2-dropdown-multiselect';
import { AgmCoreModule } from "angular2-google-maps/core";
import {BusyModule} from 'angular2-busy';


@NgModule({
    imports: [
        AgmCoreModule.forRoot({
            apiKey: "AIzaSyC6UFj0VOyEzkqseKrklaDH8XOTJh_q6wk",
            libraries: ["places"]
        }),
        ReactiveFormsModule,        
        FormsModule,
        CommonModule,
        PlaceRoutingModule,
        PageHeaderModule,
        DialogModule,
        DropdownModule,
        DataTableModule,
        SharedModule,
        MultiselectDropdownModule,
        ListboxModule,
        GooglePlaceModule,
        BusyModule
    ],
    declarations: [PlaceComponent],
    providers: [PlaceServiceApi,StatusServiceApi,GlobalApi,RepPlaceServiceApi,UserServiceApi]
})
export class PlaceModule { }